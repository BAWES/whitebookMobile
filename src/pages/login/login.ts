import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ForgotPasswordPage } from '../forgot-password/forgot-password'
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
  )
     {
    this.loginCase = 'login';
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  presentModal() {
    let modal = this.modalCtnl.create(ForgotPasswordPage);
    modal.present();
  }
}
