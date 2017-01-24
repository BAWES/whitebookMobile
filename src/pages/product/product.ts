import { Component } from '@angular/core';
import { NavController, NavParams,ModalController, ToastController } from 'ionic-angular';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart'

import { Product } from '../../providers/product';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {
  productSection:string;
  product_id:number;
  productDetail : any;
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
    public toastCtrl : ToastController,
    public _productService : Product
    ) {
    this.productSection = "pdescription";
  }

  ionViewDidLoad() {
    this.product_id = this._params.get('productId');
    this.loadProductDetail();
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

  loadProductDetail() {
    this._productService.loadProduct(this.product_id)
    .then(data=>{
      this.productDetail = data;
      console.log(this.productDetail);
    })
  }

}
