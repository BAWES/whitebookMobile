import { Component } from '@angular/core';
import { NavController,ViewController,ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

/*
  Generated class for the ForgotPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  constructor(public navCtrl: NavController,public viewCtrl : ViewController,public toastCtrl : ToastController) {}

  ionViewDidLoad() {
    console.log('Hello ForgotPasswordPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendPassword(){
    let toast = this.toastCtrl.create({
      message : 'Message Sent successfully',
      duration:2000
    });
    toast.present();
    this.viewCtrl.dismiss();
  }
}
