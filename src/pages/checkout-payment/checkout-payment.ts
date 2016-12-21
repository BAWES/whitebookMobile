import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CheckoutPaymentPage Page');
  }

}
