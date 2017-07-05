import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../../../providers/http.service';
import { GlobalService } from '../../../providers/global.service';
import { TranslateService } from '@ngx-translate/core';
import { Base } from '../../../providers/base';

@Component({
  selector: 'page-create-address',
  templateUrl: 'create-address.html'
})
export class CreateAddressPage {

  // api urls
  public _urlAddressType = '/address/type?language=' + this.translateService.currentLang;
  public _urlAddress = '/address?language=' + this.translateService.currentLang;
  public _urlLocation = '/address/location?language=' + this.translateService.currentLang;
  public _urlAddressQuestion = '/address/questions?language=' + this.translateService.currentLang + '&address_type_id=';
  public _urlSingleAddress = '/address/view?language=' + this.translateService.currentLang + '&address_id=';
  
  // local variables
  public title: string = 'Create New Address'; 
  public addressTypeData: any;
  public locationData: any;
  public locationQuestion: any;
  public questionsAnswers: any = [];
  public questionsAnswersResponse: any = [];
  
  // for edit address
  public address_id: number = 0;
  
  // local form variables and form
  public addressForm: FormGroup;
  public addressName: string = '';
  public addressType: string = '';
  public areaName: any = '';
  public addressData: string = '';

  constructor(
    public _viewCtrl : ViewController,
    public _toastCtrl:ToastController,
    public httpService: HttpService,
    public _config: GlobalService,
    public translateService: TranslateService,
    public _base:Base,
    public formBuilder: FormBuilder,
    public _navParams: NavParams,
  ) {
    // this._base.startLoading();
    this.addressForm = this.formBuilder.group({
        addressName: ['', Validators.required],
        addressType: ['', Validators.required],
        areaName: ['', Validators.required],
        addressData: ['', Validators.required],
      });
    
    if(this._navParams.get('title'))
      this.title = this._navParams.get('title');
  
    if(this._navParams.get('area_id'))
    {
      this.addressForm.controls['areaName'].setValue(this._navParams.get('area_id'));
      this.areaName = this._navParams.get('area_id');
    }      
  }

  ionViewDidLoad() { 
    
    this.loadAdressTypes();
    this.loadLocations();
    
    this.address_id = this._navParams.get('address_id');
    if (this.address_id && this.address_id != 0) {
        this.title = 'Update Address';
        this.loadAddressDetail(this.address_id);
    }
    // this._base.endLoading();
     
    this.translateService.get(this.title).subscribe(value => {
      this.title = value;
    }); 
  }

  /**
   * function to dismiss modal
   */
  dismiss() {
    this._viewCtrl.dismiss()
  }

  /**
   * save address conditionaly
   * if id exist then update else 
   * new address
   */
  saveAddress() {
    
    if (this.addressForm.valid) {
      let paramas:any;
        paramas = {
        'address_type_id':this.addressForm.value.addressType,
        'area_id':this.addressForm.value.areaName,
        'address_name':this.addressForm.value.addressName,
        'address_data':this.addressForm.value.addressData,
        'questions_answers':this.questionsAnswers,
        "address_archived": "no",
      }
      
      if (this.address_id && this.address_id != 0) {
          paramas = {
            'address_type_id':this.addressForm.value.addressType,
            'area_id':this.addressForm.value.areaName,
            'address_name':this.addressForm.value.addressName,
            'address_data':this.addressForm.value.addressData,
            'questions_answers':this.questionsAnswers,
            "address_archived": "no",
            "address_id":this.address_id
          }
          this.saveExistingAddress(paramas);
      } else {
          this.saveNewAddress(paramas);
      }
    } else {

      this.translateService.get('Please check form carefully').subscribe(value => {
        let toast = this._toastCtrl.create({
          message : value,
          duration : 4000
        });
        toast.present();
      });      
    }
  }

  /**
   * Save new address
   */
  saveNewAddress(paramas) {
      let result;
      this.httpService.post(this._urlAddress,paramas).subscribe(data=>{
      result = data;
      
      let toast = this._toastCtrl.create({
        message: result.message,
        duration: 3000
      });
      toast.present();
      if (result.operation == "success") {
          this._viewCtrl.dismiss({ address_id: result.address_id });
      }
    })
  }

  /**
   * update request to update address
   */
  saveExistingAddress(paramas) {
      let result;
      this.httpService.patch(this._urlAddress,paramas).subscribe(data=>{
      result = data;
      
      let toast = this._toastCtrl.create({
        message: result.message,
        duration: 3000
      });
      toast.present();
      if (result.operation == "success") {
          this._viewCtrl.dismiss();
      }
    })
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

  /*
   * load address detail
  */
  loadAddressDetail(address_id: number) {
    let addressDetail: any;
      this.httpService.get(this._urlSingleAddress+address_id).subscribe(data => {
      addressDetail = data;
      this.addressName = addressDetail.address.address_name;
      this.addressType = addressDetail.address.address_type_id;
      this.areaName = addressDetail.address.area_id;
      this.addressData = addressDetail.address.address_data;
      this.questionsAnswersResponse = addressDetail.question;
      this.loadQuestions(addressDetail.address.address_type_id);
    })
  }
}
