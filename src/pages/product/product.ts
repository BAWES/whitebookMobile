import { Component } from '@angular/core';
import { NavController, NavParams,ModalController, ToastController } from 'ionic-angular';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart'

import { GlobalService } from '../../providers/global.service';
import { HttpService } from '../../providers/http.service';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {
  
  public _urlProductDetail = '/product/detail?product_id=';

  public productSection:string;
  public product_id:number;
  public product : any;
  public imagePath : string;
  
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
    public _config : GlobalService,
    public httpService:HttpService
  ) {
    this.productSection = "pdescription";
    this.product_id = this._params.get('productId');
    this.imagePath = _config.images_530;
  }

  ionViewDidLoad() {
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
    this.httpService.get(this._urlProductDetail+this.product_id).subscribe(data=>{this.product = data});
  }
}