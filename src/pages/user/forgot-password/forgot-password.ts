import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
//Services
import { Authentication } from '../../../providers/auth.service';
import { Base } from '../../../providers/base';
//Validation
import { ValidFields } from '../../../validators/valid.fields';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  resetForm : FormGroup;
  resetFormData : any;
  submitAttempt :boolean = false;
  
  constructor(
    private _viewCtrl : ViewController,
    private _navCtrl: NavController,
    private _fb: FormBuilder,
    private _authService:Authentication,
    private _baseService : Base
  ) {
    this.resetForm = this._fb.group({
      email: ['', Validators.compose([Validators.required,ValidFields.isValidEmail])],
    });
  }

  back() {
    this._navCtrl.pop();
  }

  sendPassword(){
    this.submitAttempt = true;
    if(this.resetForm.valid){
      this._baseService.startLoading();
      this._authService.resetPassword(this.resetForm.value.email)
      .subscribe(data=>{
        this.resetFormData = data;
        if (this.resetFormData.operation == 'error') {
          this._baseService.showToast(this.resetFormData.message);
          this._baseService.endLoading();
        } else if (this.resetFormData.operation == 'success') {
          this._baseService.showToast(this.resetFormData.message,4000);
          this._baseService.endLoading();
          this._navCtrl.pop();
        }
      });
    }
  }
}
