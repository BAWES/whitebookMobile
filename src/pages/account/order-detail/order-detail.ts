import { Component } from '@angular/core';
import {NavParams, ViewController } from 'ionic-angular';

import { AuthHttpService } from '../../../providers/authhttp.service';
import { Global } from '../../../providers/global';

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
    public _authHttpService: AuthHttpService,
    public _config: Global 
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
      this._authHttpService.get(this._urlOrderDetailUrl +order_id).then(data=>{
         this.orderDetail = data;
         console.log(this.orderDetail);
      })
  }
}
