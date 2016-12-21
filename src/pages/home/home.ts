import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { CheckoutCartPage } from '../checkout-cart/checkout-cart'
@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(
    public navCtrl: NavController,
    public modalCtnl: ModalController
  ) {}

  mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay:true,
    speed :3000,
    pager : true
  };
  
  categorySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay:false,
    speed :3000,
    slidesPerView: 2,
  };

  openModel() {
    let modal = this.modalCtnl.create(CheckoutCartPage);
    modal.present();
  }
}
