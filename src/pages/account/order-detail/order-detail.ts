import { Component } from '@angular/core';
import {NavParams, NavController, ViewController } from 'ionic-angular';

import { AuthHttpService } from '../../../providers/authhttp.service';

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html'
})
export class OrderDetailPage {

  public _urlOrderDetailUrl: string = "/orders/detail?order_id=";
  public orderDetail:any;
  
  constructor(
    public navCtrl: NavController,
    public viewCtrl:ViewController,
    public navParams:NavParams,
    public _authHttpService: AuthHttpService
  ) {
    this.detail(this.navParams.get('order_id'));
  }

  ionViewDidLoad() {
    console.log('Order Detail Page');
  }

  dismiss () {
    this.viewCtrl.dismiss();
  }

  detail(order_id) {
      this._authHttpService.get(this._urlOrderDetailUrl +order_id).then(data=>{
         console.log(data);
      })
  }
}
