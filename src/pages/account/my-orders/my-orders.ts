import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail';

import { HttpService } from '../../../providers/http.service';

@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html'
})
export class MyOrdersPage {

  public _urlOrderUrl: string = "/orders";
  public orderList:any;
  public start:number;

  constructor(
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    public httpService: HttpService
  ) {
    this.list();  
  }

  ionViewDidLoad() {
    console.log('MyOrders Page');
  }

  itemSelected(order_id) {
      let modal = this.modalCtrl.create(OrderDetailPage,{order_id:order_id});
      modal.present();
  }

  list(start: number = 0) {
      this.httpService.get(this._urlOrderUrl +'?offset='+start).subscribe(data=>{
         this.orderList = data;
         console.log(this.orderList);
      })
  }

   /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
    let orders;
     this.start+=10;
      this.httpService.get(this._urlOrderUrl +'?offset='+this.start).subscribe(data=>{
         orders = data;
         for(let order of orders) {
          this.orderList.push(order);
        }
        infiniteScroll.complete();
      })
  }
}
