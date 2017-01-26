import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
  
  loginForm: FormGroup;
  loginData: any;
  submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public formBuilder: FormBuilder,
    public _authService: Authentication,
    public _baseService: Base
  ){
    this.loginForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.required],
    });
  }

  loginSubmit() {
    this.submitAttempt = true;
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

  forgetPasswordPage() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  registerPage() {
    this.navCtrl.push(RegisterPage);
  }
}