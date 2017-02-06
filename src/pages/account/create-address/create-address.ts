import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthHttpService } from '../../../providers/authhttp.service';
import { Base } from '../../../providers/base';

@Component({
  selector: 'page-create-address',
  templateUrl: 'create-address.html'
})
export class CreateAddressPage {

  public _urlAddressTypeUrl = '/address/type';
  public _urlLocationUrl = '/address/location';
  public _urlAddressQuestionUrl = '/address/questions?address_type_id=';

  public addressTypeData:any;
  public locationData:any;
  public locationQuestion:any;

  public addressName:string;
  public addressType:string;
  public areaName:string;
  public addressData:string;

  constructor(
    public _viewCtrl : ViewController,
    public _toastCtrl:ToastController,
    public _authHttpService: AuthHttpService,
    public _base:Base
  ) {
    this._base.startLoading();
  }

  ionViewDidLoad() {
    this.loadAdressTypes();
    this.loadLocations();
    this._base.endLoading();
  }

  dismiss() {
    this._viewCtrl.dismiss()
  }

  saveAddress() {
    let toast = this._toastCtrl.create({
        message: 'Address Saved Successfully',
        duration: 3000
      });
      toast.present();
      this._viewCtrl.dismiss();
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
}
