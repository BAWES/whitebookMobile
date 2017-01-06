import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart'
import { ListingPage } from '../listing/listing';
import { ProductPage } from '../product/product';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {
  featureProduct:any[]
  sliderSlides:any[]
  categories:any[]
  constructor(public navCtrl: NavController,public modalCtnl: ModalController  ) {}

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

  this.categories = [
    {'title':"Venue",'icon':"venus-icon",'id':'1'},
    {'title':"Invitation",'icon':"invitation-icon",'id':'2'},
    {'title':"Food & Beverage",'icon':"food-icon",'id':'3'},
    {'title':"Decor",'icon':"decor-icon",'id':'4'},
    {'title':"Supplies",'icon':"supplies-icon",'id':'5'},
    {'title':"Entertainment",'icon':"entertainment-icon",'id':'6'},
    {'title':"Services",'icon':"service-icon",'id':'7'},
    {'title':"Other",'icon':"other-icon",'id':'8'},
    {'title':"Gift Favors",'icon':"gift-favor-icon",'id':'9'},
  ]
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
}
