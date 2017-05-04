import { Component } from '@angular/core';
import { NavController, ModalController, AlertController,ToastController } from 'ionic-angular';
import { CreateAddressPage } from '../create-address/create-address';

import { HttpService } from '../../../providers/http.service';

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
    public httpService: HttpService
  ) {}
  
  ionViewDidLoad() {
    this.list();
  }

  create() {
    let modal = this.modalCtrl.create(CreateAddressPage);
    modal.present();
    modal.onDidDismiss(data => { 
       this.start = 0;
       this.list(); // load list again
    });
  }

  update(addresses : number) {
    let modal = this.modalCtrl.create(CreateAddressPage,{address_id:addresses});
    modal.present();
    modal.onDidDismiss(data => { 
       this.start = 0;
       this.list(); // load list again
    });
  }
  delete(id){
    let confirm = this.alertCtrl.create({
      title: 'Address Delete?',
      message: 'Are you sure you want to delete this Address permanently from our system?',
      buttons : [
        {
          text:'Yes',
          handler:() => {
            let result:any;
            this.httpService.delete(this._urlAddressUrl+'?address_id='+id).subscribe(data=>{
              result = data;
              this.list();
              let toast = this.toastCtrl.create({
                message : result.message,
                duration:3000
              });
              toast.present();
            })
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
      this.httpService.get(this._urlAddressUrl +'?offset='+start).subscribe(data=>{
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
      this.httpService.get(this._urlAddressUrl +'?offset='+this.start).subscribe(data=>{
         addressList = data;
         for(let address of addressList) {
          this.addresses.push(address);
        }
        infiniteScroll.complete();
      })
  }

}
