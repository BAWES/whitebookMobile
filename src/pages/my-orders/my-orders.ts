import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail';

/*
  Generated class for the MyOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html'
})
export class MyOrdersPage {
  items:any[];

  constructor(public navCtrl: NavController,public modalCtrl:ModalController) {
    this.items = [
      {id:'WB10029',Total:223,TotalProducts:10},
      {id:'WB21029',Total:1223,TotalProducts:20},
      {id:'WB31229',Total:1021,TotalProducts:14},
      {id:'WB12543',Total:995,TotalProducts:5},
      {id:'WB21029',Total:1223,TotalProducts:20},
      {id:'WB31229',Total:1021,TotalProducts:14},
    ]
  }

  ionViewDidLoad() {
    console.log('Hello MyOrdersPage Page');
  }

  itemSelected(item) {
      let modal = this.modalCtrl.create(OrderDetailPage);
      modal.present();
  }
}
