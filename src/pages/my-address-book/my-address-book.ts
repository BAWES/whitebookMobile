import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the MyAddressBook page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-address-book',
  templateUrl: 'my-address-book.html'
})
export class MyAddressBookPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello MyAddressBookPage Page');
  }

}
