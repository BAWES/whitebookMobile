import { Component } from '@angular/core';
import { NavController, NavParams,ModalController, ToastController } from 'ionic-angular';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart'
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
  
  constructor(
    public navCtrl: NavController,
    private _params : NavParams,
    public modalCtnl: ModalController,
    public toastCtrl : ToastController
    ) {
    this.productSection = "pdescription";
  }

  ionViewDidLoad() {
    console.log('product detail page for id : '+ this._params.get('productId')); 
  }
  openModel() {
    let modal = this.modalCtnl.create(CheckoutCartPage);
    modal.present();
  }

  addToCart() {
    let toast = this.toastCtrl.create({
      message : 'Item Added To Cart Successfully',
      duration : 2000
    });
    toast.present();
  }

  addToWishList() {
    let toast = this.toastCtrl.create({
      message : 'Item Added To Wishlist Successfully',
      duration : 2000
    });
    toast.present();
  }

}
