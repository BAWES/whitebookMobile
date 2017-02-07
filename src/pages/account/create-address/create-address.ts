import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthHttpService } from '../../../providers/authhttp.service';
import { Base } from '../../../providers/base';

@Component({
  selector: 'page-create-address',
  templateUrl: 'create-address.html'
})
export class CreateAddressPage {

  public _urlAddressTypeUrl = '/address/type';
  public _urlAddressUrl = '/address';
  public _urlLocationUrl = '/address/location';
  public _urlAddressQuestionUrl = '/address/questions?address_type_id=';
  public _urlSingleAddressUrl = '/address/view?address_id=';
  
  public title: string = 'Create New Address'; 
  public addressTypeData: any;
  public locationData: any;
  public locationQuestion: any;
  
  public address_id: number = 0;
  
  public addressForm: FormGroup;
  public addressName: string = '';
  public addressType: string = '';
  public areaName: string = '';
  public addressData: string = '';

  constructor(
    public _viewCtrl : ViewController,
    public _toastCtrl:ToastController,
    public _authHttpService: AuthHttpService,
    public _base:Base,
    public formBuilder: FormBuilder,
    public _navParams: NavParams,
  ) {
    this._base.startLoading();
    this.addressForm = this.formBuilder.group({
        addressName: ['', Validators.required],
        addressType: ['', Validators.required],
        areaName: ['', Validators.required],
        addressData: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    this.loadAdressTypes();
    this.loadLocations();
    this._base.endLoading();
    this.address_id = this._navParams.get('address_id');
    if (this.address_id && this.address_id != 0) {
        console.log("Address ID : "+this.address_id);
        this.title = 'Update Address';
        this.loadSingleAddress(this.address_id);
    }
  }

  dismiss() {
    this._viewCtrl.dismiss()
  }

  saveAddress() {
    if (this.addressForm.valid) {
      let paramas:any;
        paramas = {
        'address_type_id':this.addressForm.value.addressType,
        'area_id':this.addressForm.value.areaName,
        'address_name':this.addressForm.value.addressName,
        'address_data':this.addressForm.value.addressData,
        "address_archived": "no",
      }
      
      if (this.address_id && this.address_id != 0) {
          paramas = {
            'address_type_id':this.addressForm.value.addressType,
            'area_id':this.addressForm.value.areaName,
            'address_name':this.addressForm.value.addressName,
            'address_data':this.addressForm.value.addressData,
            "address_archived": "no",
            "address_id":this.address_id
          }
          this.updateAddress(paramas);
      } else {
          this.newAddress(paramas);
      }
    }
  }

  newAddress(paramas) {
      let result;
      this._authHttpService.post(this._urlAddressUrl,paramas).then(data=>{
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

  updateAddress(paramas) {
      let result;
      this._authHttpService.patch(this._urlAddressUrl,paramas).then(data=>{
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

  loadAdressTypes() {
    this._authHttpService.get(this._urlAddressTypeUrl).then(data => {
      this.addressTypeData = data;
    })
  }

  loadLocations() {
    this._authHttpService.get(this._urlLocationUrl).then(data => {
      this.locationData = data;
    })
  }

  loadQuestions(address_type_id : number) {
    this._authHttpService.get(this._urlAddressQuestionUrl+address_type_id).then(data => {
      console.log(data);
      this.locationQuestion = data;
    })
  }

  loadSingleAddress(address_id: number) {
    let addressDetail: any;
      this._authHttpService.get(this._urlSingleAddressUrl+address_id).then(data => {
      addressDetail = data;
      this.addressName = addressDetail.address.address_name;
      this.addressType = addressDetail.address.address_type_id;
      this.areaName = addressDetail.address.area_id;
      this.addressData = addressDetail.address.address_data;
      console.log(addressDetail);
      console.log(this.addressData);
    })
  }

  generateQuestionObject() {
    
  }
}
