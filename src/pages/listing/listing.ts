import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductPage } from '../product/product';
/*
  Generated class for the Listing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html'
})
export class ListingPage {
  title : string;
  productView = 'grid';
  category:any;
  constructor(
    public navCtrl: NavController,
    private _params : NavParams

  ) {}

  ionViewDidLoad() {
    console.log(this._params.get('category'));
    this.category = this._params.get('category');
    this.title = this.category.title;
  }

  productDetail(id) {
    console.log('opening product detail page of id : '+id);
    this.navCtrl.push(ProductPage,{productId:id});
  }
}
