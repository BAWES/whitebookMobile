import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay:true,
    speed :3000,
    pager : true
  };
  
  constructor(public navCtrl: NavController,private _params : NavParams) {}

  ionViewDidLoad() {
    console.log('product detail page for id : '+ this._params.get('productId')); 
  }
}
