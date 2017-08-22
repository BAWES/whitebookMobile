import { Component } from '@angular/core';
import { NavParams, NavController, AlertController, LoadingController, ViewController,  } from 'ionic-angular';
//Pages
import { CheckoutCompletedPage } from '../checkout-completed/checkout-completed';
//Services
import { CheckoutService } from '../../../providers/checkout.service';
import { CartService } from '../../../providers/cart.service';
import { GlobalService } from '../../../providers/global.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-checkout-confirm',
  templateUrl: 'checkout-confirm.html'
})

export class CheckoutConfirmPage {

  public cartItems:any[] = [];
  public summary:any;
  public delivery_vendors:any;
  public start:number = 0;
  public address_id: any;
  
  //customer info 
  public firstname: any;
  public lastname: any;
  public email: any;
  public mobile: any;

  public errors: any[] = [];

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController, 
    public viewCtrl : ViewController,
    public _alertCtrl : AlertController,
    public _loadingCtrl: LoadingController,
    public checkoutService: CheckoutService,
    public cartService: CartService,
    public translateService: TranslateService,
    public _config: GlobalService
    ) {
      this.address_id = this.navParams.get('address_id'); 
      this.firstname = this.navParams.get('firstname');  
      this.lastname = this.navParams.get('lastname');  
      this.email = this.navParams.get('email');  
      this.mobile = this.navParams.get('mobile');  
    }

  ionViewDidLoad() {
    this.loadCartList();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  confirm() {
    let loader = this._loadingCtrl.create();
    loader.present();

    let params = {
      'delivery-location': window.localStorage.getItem('delivery-location'),
      'delivery-date': window.localStorage.getItem('delivery-date'),
      'event_time': window.localStorage.getItem('event_time'),
      'firstname': this.firstname,
      'lastname': this.lastname,
      'email': this.email,
      'mobile': this.mobile,
      'address_id': this.address_id,
    };

    this.checkoutService.confirm(params).subscribe(response => {

      if(response.operation == 'success') 
      {
        this.navCtrl
          .push(CheckoutCompletedPage, { arr_booking_id : response.arr_booking_id });

          /*.then(() => {
            // first we find the index of the current view controller:
            const index = this.viewCtrl.index;
            // then we remove it from the navigation stack
            this.navCtrl.remove(index);
            this.navCtrl.remove(index - 1);//shipping page 
          });*/
      }
      else
      {
        let txtButton;
        this.translateService.get('Okay!').subscribe(value => {
          txtButton = value;
        });

        let alert = this._alertCtrl.create({
          subTitle: response.message,
          buttons: [txtButton]
        });
        alert.present();
      }

      loader.dismiss();
    });    
  }

  /**
   * method load cart items
   */
  loadCartList() {
    this.cartService.list().subscribe(list => {
      this.cartItems = list.items;
      this.summary = list.summary;
      this.delivery_vendors = list.summary.delivery_vendors;
      this.errors = list.errors;
    })
  }

  back() {
    this.navCtrl.pop();
  }
}
