import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
//Pages
import { CheckoutConfirmPage } from '../checkout-confirm/checkout-confirm';
import { CreateAddressPage } from '../../account/create-address/create-address';
//Services
import { AddressService } from '../../../providers/address.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../providers/global.service';

@Component({
  selector: 'page-checkout-shipping',
  templateUrl: 'checkout-shipping.html'
})
export class CheckoutShippingPage {

  public addressForm: FormGroup;

  public addresses: any;
  public address_id: number;
  public deliveryLocation: string;
  public showAddressForm: boolean = false; 
  
  //address form variable 
  public addressTypeData: any;
  public locationQuestion: any;
  public questionsAnswers: any = [];
  public questionsAnswersResponse: any = [];

  constructor(
    public navCtrl: NavController,
    public addressService: AddressService,
    public translateService: TranslateService,
    public _alertCtrl : AlertController,
    public _modalCtrl: ModalController,
    public _config: GlobalService,
    public formBuilder: FormBuilder
  ) {
    this.addressForm = this.formBuilder.group({
        addressName: ['', Validators.required],
        addressType: ['', Validators.required],
        addressData: ['', Validators.required],
      });
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData () {

    let area_id = window.localStorage.getItem('delivery-location');
    
    this.addressService.location(area_id).subscribe(data => {
      this.deliveryLocation = this._config.translate(data.location, data.location_ar);      
    });

    this.addressService.listAll(area_id).subscribe(data=>{
         this.addresses = data;

         if(this.addresses.length == 0) {
           this.loadAdressTypes();
           this.showAddressForm = true;
         } else {
           this.showAddressForm = false;
         }          
      });
  }

  cartModelPage () {
    this.navCtrl.pop();
  }

  confirmPage() {
    
    if(!this.address_id) {
      this.translateService.get('Please select address.').subscribe(value => {
        let alert = this._alertCtrl.create({
          subTitle: value,
          buttons: ['Okay!']
        });
        alert.present();
      });      
    }
    else
    {
      this.navCtrl.push(CheckoutConfirmPage, { address_id: this.address_id });
    }    
  }

  newAddressModal() {    
    this.translateService.get('Add Shipping Address').subscribe(value => {
      let modal = this._modalCtrl.create(CreateAddressPage, { 
        area_id: window.localStorage.getItem('delivery-location'),
        title: value
      });
      modal.present();
      modal.onDidDismiss(data => { 
        this.loadData(); // load list again
      });
    });
  }
  
  /*
  * load questions of address type
  */
  loadQuestions(address_type_id : number) {
    this.addressService.loadQuestions(address_type_id).subscribe(data => {
      this.locationQuestion = data;
      this.questionsAnswers[0]= null;
      this.locationQuestion.forEach((question,index) => {
        this.questionsAnswers[question.ques_id] = '';
        
        this.questionsAnswersResponse.forEach((answers,index) => {
          if (answers.address_type_question_id == question.ques_id) {
              this.questionsAnswers[question.ques_id] = answers.response_text;
          }
        });
      });
    });
  }
  
  /**
   * load address type
   */
  loadAdressTypes() {
    this.addressService.loadAdressTypes().subscribe(data => {
      this.questionsAnswers = [];
      this.addressTypeData = data;
    })
  }

  /**
   * save address
   */
  saveAddress() {
    
    if (this.addressForm.valid) {

      let paramas = {
        'address_type_id':this.addressForm.value.addressType,
        'area_id': window.localStorage.getItem('delivery-location'),
        'address_name':this.addressForm.value.addressName,
        'address_data':this.addressForm.value.addressData,
        'questions_answers':this.questionsAnswers,
        "address_archived": "no",
      }
      
      this.addressService.add(paramas).subscribe(result => {       
        console.log(result);
        if (result.operation == "success") {
          this.navCtrl.push(CheckoutConfirmPage, { address_id: result.address_id });
        } else {
          let alert = this._alertCtrl.create({
            subTitle: result.message,
            buttons: ['Okay!']
          });
          alert.present();        
        }
      });
      
    } else {

      this.translateService.get('Please check form carefully').subscribe(value => {
        let alert = this._alertCtrl.create({
          subTitle: value,
          buttons: ['Okay!']
        });
        alert.present();
      });      
    }
  }
}
