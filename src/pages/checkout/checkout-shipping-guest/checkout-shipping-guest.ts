import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CheckoutConfirmPage } from '../checkout-confirm/checkout-confirm';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../../../providers/http.service';
import { AddressService } from '../../../providers/address.service';
import { GlobalService } from '../../../providers/global.service';

/*
  Generated class for the CheckoutShipping page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-shipping-guest',
  templateUrl: 'checkout-shipping-guest.html'
})
export class CheckoutShippingGuestPage {
  
  // api urls
  public _urlAddressType = '/address/type';
  public _urlLocation = '/address/location';
  public _urlAddressQuestion = '/address/questions?address_type_id=';

  public addressTypeData: any;
  public locationData: any;
  public locationQuestion: any;
  public questionsAnswers: any = [];
  public questionsAnswersResponse: any = [];
  public address_id: number;

  public addressForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public addressService: AddressService,
    public _alertCtrl : AlertController,
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public _config: GlobalService
  ) {
      this.addressForm = this.formBuilder.group({
        addressName: ['', Validators.required],
        addressType: ['', Validators.required],
        //areaName: ['', Validators.required],
        addressData: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        mobile: ['', Validators.required],
      });
  }

  ionViewDidLoad() {    
    this.loadAdressTypes();
    //this.loadLocations();    
  }

  cartModelPage () {
    this.navCtrl.pop();
  }

  confirmPage() {
    
    let area_id = window.localStorage.getItem('delivery-location');

    if (!this.addressForm.valid) {
      console.log(this.addressForm);
      let alert = this._alertCtrl.create({
          subTitle: 'Please check form carefully',
          buttons: ['Okay!']
      });
      alert.present();
      return false;
    }

    let paramas:any;
    paramas = {
        'firstname' : this.addressForm.value.firstname, 
        'lastname' : this.addressForm.value.lastname, 
        'email' : this.addressForm.value.email, 
        'mobile' : this.addressForm.value.mobile, 
        'address_type_id': this.addressForm.value.addressType,
        'area_id': area_id,
        'address_name': this.addressForm.value.addressName,
        'address_data': this.addressForm.value.addressData,
        'questions': this.questionsAnswers,
    };

    this.addressService.addGuestAddress(paramas).subscribe(response => {
      if (response.operation == "success") {
        this.navCtrl.push(CheckoutConfirmPage, {
          'address_id' : response.address_id,
          'firstname' : response.firstname,
          'lastname' : response.lastname,
          'email' : response.email,
          'mobile' : response.mobile
        });
      }else{
        let alert = this._alertCtrl.create({
            subTitle: 'Please check form carefully',
            message: response.errors,
            buttons: ['Okay!']
        });
        alert.present();
      }
    });    
  }
  
  /**
   * load address type
   */
  loadAdressTypes() {
    this.httpService.get(this._urlAddressType).subscribe(data => {
      this.questionsAnswers = [];
      this.addressTypeData = data;
    })
  }
  
  /**
   * load all locations
   */
  loadLocations() {
    this.httpService.get(this._urlLocation).subscribe(data => {
      this.locationData = data;
    })
  }
  
  /*
  * load questions of address type
  */
  loadQuestions(address_type_id : number) {
    this.httpService.get(this._urlAddressQuestion+address_type_id).subscribe(data => {
      this.locationQuestion = data;
      this.questionsAnswers[0]= null;
      this.locationQuestion.forEach((question,index) => {
        this.questionsAnswers[question.ques_id] = '';
        
        this.questionsAnswersResponse.forEach((answers,index) => {
          if (answers.address_type_question_id == question.ques_id) {
              this.questionsAnswers[question.ques_id] = answers.response_text;
          }
        })
      });
    })
  }
}
