import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { Home } from '../../home/home';

@Component({
  selector: 'page-checkout-completed',
  templateUrl: 'checkout-completed.html'
})

export class CheckoutCompletedPage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController
  ) {}

  dismiss() {
    this.navCtrl.setRoot(Home);
    this.navCtrl.popToRoot();

    /*this.navCtrl.setRoot(Home).then(data => {
      this.navCtrl.popToRoot();
      this.menuCtrl.enable(true, 'menu1');
      this.menuCtrl.enable(true, 'menu2');
    });*/
  }
}
 