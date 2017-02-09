import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { CheckoutShippingPage } from '../checkout-shipping/checkout-shipping';
import { HttpService } from '../../../providers/http.service';

@Component({
  selector: 'page-checkout-cart',
  templateUrl: 'checkout-cart.html'
})

export class CheckoutCartPage {

  public _urlCart = '/cart';
  constructor(public navCtrl: NavController, public viewCtrl : ViewController,public httpRequest : HttpService) {}

  ionViewDidLoad() {
    console.log('Hello CheckoutCartPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  shippingModelPage() {
      this.navCtrl.push(CheckoutShippingPage);
  }

  loadCartList(){
    this.httpRequest.get(this._urlCart).subscribe(data => {
      console.log(data);
    })
  }
}
