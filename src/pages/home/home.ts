import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart'
import { ListingPage } from '../listing/listing';
import { ProductPage } from '../product/product';

import { Category } from '../../providers/category';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {
  featureProduct:any[]
  sliderSlides:any[]
  categories:any[]
  constructor(public navCtrl: NavController,public modalCtnl: ModalController,public _category : Category  ) {
    this.loadPages();
  }

  mySlideOptions = {initialSlide: 1,loop: true,autoplay:true,speed :3000,pager : true};
  categorySlideOptions = {initialSlide: 1,loop: true,autoplay:false,speed :3000,slidesPerView: 2};
  
  openModel() {
    let modal = this.modalCtnl.create(CheckoutCartPage);
    modal.present();
  }

  ionViewDidLoad() {
    this.featureProduct = [
      {'title':'Food','category':'food','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'title':'Food','category':'food','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'title':'Food','category':'food','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'title':'Food','category':'food','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
    ];

    this.sliderSlides = [
      {'image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'}
    ];
  }

  loadProducts(title,id) {
    this.navCtrl.push(ListingPage,{
      title : title,
      id:id
    });
  }

  loadProduct(title) {
    this.navCtrl.push(ProductPage,{
        title : title,
    });
  }

  // Loading category from api
  loadPages(){
    this._category.load()
    .then(data => {
      this.categories = data;
    });
  }
}
