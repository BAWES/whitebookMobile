import { Component } from '@angular/core';
import { NavController, AlertController, ViewController, ToastController } from 'ionic-angular';
import { CheckoutShippingPage } from '../checkout-shipping/checkout-shipping';
import { CartService } from '../../../providers/cart.service';
import { GlobalService } from '../../../providers/global.service';
import { Authentication } from '../../../providers/auth.service';

@Component({
  selector: 'page-checkout-cart',
  templateUrl: 'checkout-cart.html'
})

export class CheckoutCartPage {

  //api request urls
  public _urlCart = '/cart';

  public area_id: any;
  public event_time: string;
  public delivery_date: string;

  public isUserLoggedIn = false;
  public cartItems:any;
  public summary:any;
  public delivery_vendors:any;
  public start:number=0;
  
  constructor(
    public navCtrl: NavController, 
    public viewCtrl : ViewController,
    public alertCtrl : AlertController,
    public toastCtrl : ToastController,
    public cartService: CartService,
    public authService: Authentication,
    public _config: GlobalService
    ) {
      this.isUserLoggedIn = (this.authService.getAccessToken()) ? true : false;

      this.area_id = window.localStorage.getItem('delivery-location');
      this.delivery_date = window.localStorage.getItem('delivery-date');
      this.event_time = window.localStorage.getItem('event_time');
    }

  ionViewDidLoad() {
    this.loadCartList();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  shippingModelPage() {
      this.navCtrl.push(CheckoutShippingPage);
  }

  /**
   * method load cart items
   */
  loadCartList() {
    this.cartService.list().subscribe(list => {
      this.cartItems = list.items;
      this.summary = list.summary;
      this.delivery_vendors = list.summary.delivery_vendors;
    })
  }

  removeItem(cart_id) {
    let alert = this.alertCtrl.create({
      title : 'Remove cart item?',
      message : 'Are you sure you want to remove product from cart?',
      buttons : [
        {
          text: 'Yes',
          handler:() => {
            let result:any;
            this.cartService.delete(cart_id).subscribe(data => {
              result = data;
              this.loadCartList();
              let toast = this.toastCtrl.create({
                message : result.message,
                duration:3000
              });
              toast.present();
            })
          }
        },
        {
          text: 'no',
          handler:() => {
            console.log('cart item remain');
          }
        }
      ]
    })
    alert.present();
  }
}
