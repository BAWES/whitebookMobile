import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { CheckoutConfirmPage } from '../checkout-confirm/checkout-confirm';
import { CreateAddressPage } from '../../account/create-address/create-address';
import { AddressService } from '../../../providers/address.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../providers/global.service';

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
  public deliveryLocation: string;

  constructor(
    public navCtrl: NavController,
    public addressService: AddressService,
    public translateService: TranslateService,
    public _alertCtrl : AlertController,
    public _modalCtrl: ModalController,
    public _config: GlobalService
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData () {

    let area_id = window.localStorage.getItem('delivery-location');
    
    this.addressService.location(area_id).subscribe(data => {
      this.deliveryLocation = this._config.translate(data.location, data.location_ar);      
    });

    this.addressService.listAll(area_id).subscribe(data=>{
         this.addresses = data;

         if(this.addresses.length == 0)
          this.newAddressModal();
      });
  }

  cartModelPage () {
    this.navCtrl.pop();
  }

  confirmPage() {
    
    if(!this.address_id) {
      this.translateService.get('Please select address.').subscribe(value => {
        let alert = this._alertCtrl.create({
          subTitle: value,
          buttons: ['Okay!']
        });
        alert.present();
      });      
    }
    else
    {
      this.navCtrl.push(CheckoutConfirmPage, { address_id: this.address_id });
    }    
  }

  newAddressModal() {    
    this.translateService.get('Add Shipping Address').subscribe(value => {
      let modal = this._modalCtrl.create(CreateAddressPage, { 
        area_id: window.localStorage.getItem('delivery-location'),
        title: value
      });
      modal.present();
      modal.onDidDismiss(data => { 
        this.loadData(); // load list again
      });
    });
  }
}
