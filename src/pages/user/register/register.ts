import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public navCtrl: NavController,public toastCtrl : ToastController) {}

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
  }

  dismiss() {
    this.navCtrl.pop();
  }

  register() {
    let toast = this.toastCtrl.create({
      message:'Register Successfully',
      duration:2000
    });
    toast.present();
    this.navCtrl.pop();
  }

}
