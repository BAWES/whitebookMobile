import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    private _params : NavParams

  ) {}

  ionViewDidLoad() {
    console.log(this._params.get('id'));
  }

}
