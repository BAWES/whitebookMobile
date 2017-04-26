import { Component } from '@angular/core';
import { NavController, AlertController, ViewController, ToastController } from 'ionic-angular';
import { CheckoutShippingPage } from '../checkout-shipping/checkout-shipping';
import { HttpService } from '../../../providers/http.service';
import { GlobalService } from '../../../providers/global.service';
import { Authentication } from '../../../providers/auth.service';

@Component({
  selector: 'page-checkout-cart',
  templateUrl: 'checkout-cart.html'
})

export class CheckoutCartPage {

  //api request urls
  public _urlCart = '/cart';

  public cartItems:any;
  public summary:any;
  public delivery_vendors:any;
  public start:number=0;
  public isUserLoggedIn:boolean = false;
  constructor(
    public navCtrl: NavController, 
    public viewCtrl : ViewController,
    public httpRequest : HttpService,
    public _config:GlobalService,
    public alertCtrl : AlertController,
    public toastCtrl : ToastController,
    public authService: Authentication
    ) {
      this.isUserLoggedIn = this.authService.getAccessToken();
    }

  ionViewDidLoad() {
    if (this.authService.getAccessToken()) {
      this.loadCartList();
    }
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
  loadCartList(){
    this.httpRequest.get(this._urlCart+'?offset=0').subscribe(list => {
      this.cartItems = list.items;
      this.summary = list.summary;
      this.delivery_vendors = list.summary.delivery_vendors;
      console.log(this.delivery_vendors);
      console.log(this.cartItems);
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
            this.httpRequest.delete(this._urlCart+'?cart_id='+cart_id).subscribe(data=>{
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

  /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    let CartItems;
    this.start+=10;
    this.httpRequest.get(this._urlCart +'?offset='+this.start).subscribe(data=>{
        if (data.items.length) {
          CartItems = data.items;
          this.summary = data.summary;
          this.delivery_vendors = data.summary.delivery_vendors;
          for(let item of CartItems) {
            this.cartItems.push(item);
          }
        }
        
      console.log('Begin async operation');
      infiniteScroll.complete();
    })
  }

}
