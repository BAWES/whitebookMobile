import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

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
