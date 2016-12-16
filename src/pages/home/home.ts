import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController) {
    
  }

  mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay:true,
    speed :3000,
    pager : true
  };
}
