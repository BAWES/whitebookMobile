import { Component } from '@angular/core';
import {NavParams, ViewController } from 'ionic-angular';

import { HttpService } from '../../../providers/http.service';

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html'
})

export class OrderDetailPage {
  public _urlOrderDetailUrl: string = "/orders/detail?order_id=";
  public orderDetail:any;
  
  constructor(
    public _viewCtrl:ViewController,
    public _navParams:NavParams,
    public httpRequest: HttpService,
  ) {
    this.detail(this._navParams.get('order_id'));
  }

  ionViewDidLoad() {
    console.log('Order Detail Page');
  }

  dismiss () {
    this._viewCtrl.dismiss();
  }

  detail(order_id) {
      this.httpRequest.get(this._urlOrderDetailUrl +order_id).subscribe(data=>{
         this.orderDetail = data;
         console.log(this.orderDetail);
      })
  }
}
