import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ProductPage } from '../product/product';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart';
import { SearchItemPage } from '../search-item/search-item';
import { SearchFilterPage } from '../search-filter/search-filter';

import { Product } from '../../providers/product';

@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html'
})
export class ListingPage {
  title : string;
  id : number;
  productView :string;
  category:any;
  products : any;
  constructor(
    public navCtrl: NavController,
    private _params : NavParams,
    public modalCtnl: ModalController,
    public _productService : Product
  ) {
  }

  ionViewDidLoad() {
    this.productView = 'grid-view';
    this.id = this._params.get('id');
    this.title = this._params.get('title');
    this.loadProducts();
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

  loadProducts() {
    this._productService.loadProductList(this.id)
    .then(data => {
      this.products = data;
    });
  }

}
