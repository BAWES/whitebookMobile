import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CheckoutPaymentPage } from '../checkout-payment/checkout-payment';
/*
  Generated class for the CheckoutShipping page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-shipping',
  templateUrl: 'checkout-shipping.html'
})
export class CheckoutShippingPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CheckoutShippingPage Page');
  }

  cartModelPage () {
    this.navCtrl.pop();
  }

  PaymentModelPage () {
    this.navCtrl.push(CheckoutPaymentPage);
  }
}
