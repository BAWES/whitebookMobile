import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { CreateAddressPage } from '../create-address/create-address';
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

  constructor(
    public navCtrl: NavController,
    public modalCtrl : ModalController,
    public alertCtrl: AlertController
  ) {}
  
  ionViewDidLoad() {
    console.log('Hello MyAddressBookPage Page');
  }

  createAddress() {
    let modal = this.modalCtrl.create(CreateAddressPage);
    modal.present();
  }

  deleteConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Address Delete?',
      message: 'Are you sure you want to delete this address permanently from our system?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
