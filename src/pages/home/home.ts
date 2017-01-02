import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { CheckoutCartPage } from '../checkout-cart/checkout-cart'

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home{
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
    {'title':"Venue",'icon':"fa-map-marker"},
    {'title':"Invitation",'icon':"fa-envelope-open-o"},
    {'title':"Food & Beverage",'icon':"fa-cutlery"},
    {'title':"Decor",'icon':"fa-building"},
    {'title':"Supplies",'icon':"fa-truck"},
    {'title':"Entertainment",'icon':"fa-headphones"},
    {'title':"Services",'icon':"fa-cogs"},
    {'title':"Other",'icon':"fa-cubes"},
    {'title':"Gift Favors",'icon':"fa-gift"},
  ]
  }
}
