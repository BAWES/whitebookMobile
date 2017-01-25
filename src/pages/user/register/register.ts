import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

//Services
import { Authentication } from '../../../providers/authentication';
import { Base } from '../../../providers/base';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  private registerForm : any;
  private registerData : any;

  constructor(
    private navCtrl: NavController,
    private toastCtrl : ToastController,
    private fb: FormBuilder,
    private _authService:Authentication,
    private _baseService : Base
    ) {
      this.registerForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        mobileNumber: ['', Validators.required],
      });
    }

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
  }

  dismiss() {
    this.navCtrl.pop();
  }

  registerSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
    
    if (this.registerForm.valid) {
      this._baseService.startLoading();
      this._authService.createAccount(
        this.registerForm.value.firstName, 
        this.registerForm.value.lastName, 
        this.registerForm.value.email, 
        this.registerForm.value.password,
        this.registerForm.value.dob,
        this.registerForm.value.gender,
        this.registerForm.value.mobileNumber,
      )
      .then(data=>{
        this.registerData = data;
        if (this.registerData.operation == 'error' ) {
          this._baseService.showToast(this.registerData.message,4000);
          this._baseService.endLoading();
        } else if (this.registerData.operation == 'success' ) {
          this._baseService.showToast('Registered Successfully. Please check your email for activation link',4000);
          setTimeout(() => {
            this._baseService.endLoading();
            this.navCtrl.pop();
          });
        }
      })
    }
  }
}
