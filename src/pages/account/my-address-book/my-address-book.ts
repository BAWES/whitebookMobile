import { Component } from '@angular/core';
import { ModalController, AlertController,ToastController } from 'ionic-angular';
//Pages
import { CreateAddressPage } from '../create-address/create-address';
//Services
import { GlobalService } from '../../../providers/global.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../../providers/http.service';
import { AddressService } from '../../../providers/address.service';

@Component({
  selector: 'page-my-address-book',
  templateUrl: 'my-address-book.html'
})
export class MyAddressBookPage {
  
  public addresses:any;
  public start:number = 0;

  private txtDeleteTitle; 
  private txtDeleteMessage;

  constructor(
    public modalCtrl : ModalController,
    public alertCtrl: AlertController,
    public toastCtrl :ToastController,
    public httpService: HttpService,
    public translateService: TranslateService,
    public addressService: AddressService,
    public _config: GlobalService
  ) {
    this.translateService.get('Address Delete?').subscribe(value => {
      this.txtDeleteTitle = value;
    });
    
    this.translateService.get('Are you sure you want to delete this Address permanently from our system?').subscribe(value => {
      this.txtDeleteMessage = value;
    });
  }
  
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
  delete(id) {
    let confirm = this.alertCtrl.create({
      title: this.txtDeleteTitle,
      message: this.txtDeleteMessage,
      buttons : [
        {
          text:'Yes',
          handler:() => {
            this.addressService.delete(id).subscribe(result => {
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
  * Method will add address 
  */
  list(start: number = 0) {
      this.addressService.list(start).subscribe(data => {
         this.addresses = data;
      });
  }

  /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
      let addressList;
      this.start += 10;
      this.addressService.list(this.start).subscribe(data => {
        addressList = data;
        for(let address of addressList) {
          this.addresses.push(address);
        }
        infiniteScroll.complete();
      });
  }
}
