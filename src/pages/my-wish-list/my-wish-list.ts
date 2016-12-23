import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the MyWishList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-wish-list',
  templateUrl: 'my-wish-list.html'
})
export class MyWishListPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello MyWishListPage Page');
  }

}
