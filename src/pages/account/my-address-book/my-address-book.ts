import { Component } from '@angular/core';
import { NavController, ModalController, AlertController,ToastController } from 'ionic-angular';
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
  addresses:any[];
  constructor(
    public navCtrl: NavController,
    public modalCtrl : ModalController,
    public alertCtrl: AlertController,
    public toastCtrl :ToastController
  ) {}
  
  ionViewDidLoad() {
    this.addresses = [
      {'title':'IT Office','address':'The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.'},
      {'title':'Hospital','address':'The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.'},
      {'title':'School','address':'The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.'}
    ]
  }

  create() {
    let modal = this.modalCtrl.create(CreateAddressPage);
    modal.present();
  }

  update() {
    let modal = this.modalCtrl.create(CreateAddressPage);
    modal.present();
  }
  delete(){
    let confirm = this.alertCtrl.create({
      title: 'Address Delete?',
      message: 'Are you sure you want to delete this Address permanently from our system?',
      buttons : [
        {
          text:'Yes',
          handler:() => {
            let toast = this.toastCtrl.create({
              message: 'Address Deleted successfully',
              duration: 3000
            });
            toast.present();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Item Saved');
          }
        }
      ]
    });
    confirm.present();
  }
}
