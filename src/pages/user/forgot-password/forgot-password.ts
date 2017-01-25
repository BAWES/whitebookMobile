import { Component } from '@angular/core';
import { NavController,ViewController,ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

import { Authentication } from '../../../providers/authentication';
import { Base } from '../../../providers/base';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  private resetForm : any;
  private resetFormData : any;

  constructor(
    private _navCtrl: NavController,
    private _viewCtrl : ViewController,
    private _fb: FormBuilder,
    private _authService:Authentication,
    private _baseService : Base
  ) {
    this.resetForm = this._fb.group({
      email: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('Hello ForgotPasswordPage Page');
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

  sendPassword(){
    if(this.resetForm.valid){
      this._baseService.startLoading();
      this._authService.resetPassword(this.resetForm.value.email)
      .then(data=>{
        this.resetFormData = data;
        if (this.resetFormData.operation == 'error') {
          this._baseService.showToast(this.resetFormData.message);
          this._baseService.endLoading();
        } else if (this.resetFormData.operation == 'success') {
          this._baseService.showToast(this.resetFormData.message,4000);
          this._baseService.endLoading();
          this.dismiss();
        }
      });
    }
  }
}
