import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';

/*
  Generated class for the OrderDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html'
})
export class OrderDetailPage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl:ViewController
  ) {}

  ionViewDidLoad() {
    console.log('Hello OrderDetailPage Page');
  }

  dismiss () {
    this.viewCtrl.dismiss();
  }
}
