import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Home } from '../../home/home';
/*
  Generated class for the CheckoutCompleted page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-completed',
  templateUrl: 'checkout-completed.html'
})
export class CheckoutCompletedPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CheckoutCompletedPage Page');
  }

  dismiss() {
    this.navCtrl.setRoot(Home).then(()=>{
      this.navCtrl.popToRoot();
    })
  }
}
