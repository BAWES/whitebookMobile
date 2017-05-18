import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Home } from '../../home/home';

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
