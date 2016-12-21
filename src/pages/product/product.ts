import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { CheckoutCartPage } from '../checkout-cart/checkout-cart'
/*
  Generated class for the Product page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  productSection:string;
  mySlideOptions = {
      initialSlide: 1,
      loop: true,
      autoplay:true,
      speed :3000,
      pager : true
    };
  
  constructor(public navCtrl: NavController,private _params : NavParams,public modalCtnl: ModalController) {
    this.productSection = "pdescription";
  }

  ionViewDidLoad() {
    console.log('product detail page for id : '+ this._params.get('productId')); 
  }
  openModel() {
    let modal = this.modalCtnl.create(CheckoutCartPage);
    modal.present();
  }
}
