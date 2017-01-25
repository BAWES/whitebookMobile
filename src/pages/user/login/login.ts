import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { ForgotPasswordPage } from '../forgot-password/forgot-password'
import { RegisterPage } from '../register/register';
import { Home } from '../../home/home';

import { Authentication } from '../../../providers/authentication';
import { Base } from '../../../providers/base';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  private loginForm : any;
  private loginData :any;

  constructor(
    private navCtrl: NavController, 
    private fb: FormBuilder,
    private _authService:Authentication,
    private _baseService : Base
  ){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  forgetPasswordPage() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  registerPage() {
    this.navCtrl.push(RegisterPage);
  }

  loginSubmit() {
    if (this.loginForm.valid) {
        this._baseService.startLoading();
        this._authService.login(this.loginForm.value.email,this.loginForm.value.password)
        .then(data=>{
            this.loginData = data;
            if (this.loginData.status == 401 ) {
              this._baseService.showToast('Invalid Login Credentials.');
            } else if (this.loginData.operation == 'success' ) {
              this._baseService.storeKeyValueLocally('token', this.loginData.token);
              this._baseService.showToast('Login Successfully');
              setTimeout(() => {
                this._baseService.endLoading();
                this.navCtrl.setRoot(Home)
              });
            }
        })
      }
  }
}