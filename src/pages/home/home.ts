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
    {'title':"Venue",'icon':"fa-map-marker",'id':'1'},
    {'title':"Invitation",'icon':"fa-envelope-open-o",'id':'2'},
    {'title':"Food & Beverage",'icon':"fa-cutlery",'id':'3'},
    {'title':"Decor",'icon':"fa-building",'id':'4'},
    {'title':"Supplies",'icon':"fa-truck",'id':'5'},
    {'title':"Entertainment",'icon':"fa-headphones",'id':'6'},
    {'title':"Services",'icon':"fa-cogs",'id':'7'},
    {'title':"Other",'icon':"fa-cubes",'id':'8'},
    {'title':"Gift Favors",'icon':"fa-gift",'id':'9'},
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
