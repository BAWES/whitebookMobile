import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the CreateAddress page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-address',
  templateUrl: 'create-address.html'
})
export class CreateAddressPage {

  constructor(public navCtrl: NavController,public viewCtrl : ViewController) {}

  ionViewDidLoad() {
    console.log('Hello CreateAddressPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }
}
