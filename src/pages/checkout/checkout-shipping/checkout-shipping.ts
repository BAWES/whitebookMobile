import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { CheckoutConfirmPage } from '../checkout-confirm/checkout-confirm';
import { CreateAddressPage } from '../../account/create-address/create-address';

import { AddressService } from '../../../providers/address.service';

/*
  Generated class for the CheckoutShipping page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-shipping',
  templateUrl: 'checkout-shipping.html'
})
export class CheckoutShippingPage {

  public addresses: any;
  public address_id: number;

  constructor(
    public navCtrl: NavController,
    public addressService: AddressService,
    public _alertCtrl : AlertController,
    public _modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData () {

    let area_id = window.localStorage.getItem('delivery-location');

    this.addressService.listAll(area_id).subscribe(data=>{
         this.addresses = data;
      })
  }

  cartModelPage () {
    this.navCtrl.pop();
  }

  confirmPage() {
    
    if(!this.address_id) {
      let alert = this._alertCtrl.create({
        subTitle: 'Please select address.',
        buttons: ['Okay!']
      });
      alert.present();
    }
    else
    {
      this.navCtrl.push(CheckoutConfirmPage, { address_id: this.address_id });
    }    
  }

  newAddressModal() {
    let modal = this._modalCtrl.create(CreateAddressPage);
    modal.present();
    modal.onDidDismiss(data => { 
       this.loadData(); // load list again
    });
  }
}
