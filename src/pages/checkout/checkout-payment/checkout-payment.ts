import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { CheckoutCompletedPage } from '../checkout-completed/checkout-completed';
/*
  Generated class for the CheckoutPayment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-payment',
  templateUrl: 'checkout-payment.html'
})
export class CheckoutPaymentPage {

  constructor(public navCtrl: NavController,public viewCtrl:ViewController) {}

  ionViewDidLoad() {
    console.log('Hello CheckoutPaymentPage Page');
  }

  completeModelPage() {
    this.navCtrl.push(CheckoutCompletedPage)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
