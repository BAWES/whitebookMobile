import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CheckoutConfirmPage } from '../checkout-confirm/checkout-confirm';

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

  confirmPage() {
    this.navCtrl.push(CheckoutConfirmPage);
  }
}
