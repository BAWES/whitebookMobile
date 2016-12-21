import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { CheckoutShippingPage } from '../checkout-shipping/checkout-shipping';
/*
  Generated class for the CheckoutCart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-cart',
  templateUrl: 'checkout-cart.html'
})
export class CheckoutCartPage {

  constructor(public navCtrl: NavController, public viewCtrl : ViewController) {}

  ionViewDidLoad() {
    console.log('Hello CheckoutCartPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  shippingModelPage() {
      this.navCtrl.push(CheckoutShippingPage);
  }
}
