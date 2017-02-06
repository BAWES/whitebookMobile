import { Component } from '@angular/core';
import { NavController, ModalController, AlertController,ToastController } from 'ionic-angular';
import { CreateAddressPage } from '../create-address/create-address';

import { AuthHttpService } from '../../../providers/authhttp.service';

@Component({
  selector: 'page-my-address-book',
  templateUrl: 'my-address-book.html'
})
export class MyAddressBookPage {
    
    public _urlAddressUrl: string = "/address";
    public addresses:any;
    public start:number = 0;
  
  constructor(
    public navCtrl: NavController,
    public modalCtrl : ModalController,
    public alertCtrl: AlertController,
    public toastCtrl :ToastController,
    public _authHttpService: AuthHttpService
  ) {}
  
  ionViewDidLoad() {
    this.list();
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

  /*
  * Method will load list of events
  * at view load
  */
  list(start: number = 0) {
      this._authHttpService.get(this._urlAddressUrl +'?offset='+start).then(data=>{
         this.addresses = data;
      })
  }

  /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
      let addressList;
      this.start += 10;
      this._authHttpService.get(this._urlAddressUrl +'?offset='+this.start).then(data=>{
         addressList = data;
         for(let address of addressList) {
          this.addresses.push(address);
        }
        infiniteScroll.complete();
      })
  }

}
