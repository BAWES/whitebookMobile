import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';

import { ForgotPasswordPage } from '../forgot-password/forgot-password'
import { RegisterPage } from '../register/register';
import { Home } from '../../home/home';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginCase : string;
  constructor(
    public navCtrl: NavController, 
    public modalCtnl : ModalController,
    public toastCtrl : ToastController
  )
     {
    this.loginCase = 'login';
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  forgetPasswordPage() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  registerPage() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.navCtrl.push(Home);
    let toast = this.toastCtrl.create({
        message: 'Login Successfully',
        duration: 1000
    });
    toast.present();
  }
}
