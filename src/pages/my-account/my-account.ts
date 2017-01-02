import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

/*
  Generated class for the MyAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})
export class MyAccountPage {

  constructor(public navCtrl: NavController,public toastCtrl:ToastController) {}

  ionViewDidLoad() {
    console.log('Hello MyAccountPage Page');
  }

  udpate(){
    let toast = this.toastCtrl.create({
      message:'Data Saved Successfully',
      duration:3000,
    })
    toast.present();
  }
}
