import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ProductPage } from '../product/product';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart';
import { SearchItemPage } from '../search-item/search-item';
import { SearchFilterPage } from '../search-filter/search-filter';

@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html'
})
export class ListingPage {
  title : string;
  id : number;
  productView :string;
  category:any;
  products : any[];
  constructor(
    public navCtrl: NavController,
    private _params : NavParams,
    public modalCtnl: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.productView = 'grid-view';
    this.id = this._params.get('id');
    this.title = this._params.get('title');

    this.products = [
      {'productID':'1','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'productID':'2','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'productID':'3','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'productID':'4','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'productID':'5','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'productID':'6','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
    ]

  }

  productDetail(id) {
    console.log('opening product detail page of id : '+id);
    this.navCtrl.push(ProductPage,{productId:id});
  }
  openModel() {
    let modal = this.modalCtnl.create(CheckoutCartPage);
    modal.present();
  }

  changeView(view) {
    this.productView = view;
  }

  openSearchModel() {
    let modal = this.modalCtnl.create(SearchItemPage);
    modal.present();
  }

  searchFilter() {
    let modal = this.modalCtnl.create(SearchFilterPage);
    modal.present();
  }
}
