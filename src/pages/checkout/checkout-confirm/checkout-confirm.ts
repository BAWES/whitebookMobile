import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ViewController,  } from 'ionic-angular';
import { CheckoutShippingPage } from '../checkout-shipping/checkout-shipping';
import { HttpService } from '../../../providers/http.service';
import { Authentication } from '../../../providers/auth.service';
import { CheckoutService } from '../../../providers/checkout.service';
import { CheckoutCompletedPage } from '../checkout-completed/checkout-completed';

@Component({
  selector: 'page-checkout-confirm',
  templateUrl: 'checkout-confirm.html'
})

export class CheckoutConfirmPage {

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
    public _alertCtrl : AlertController,
    public _loadingCtrl: LoadingController,
    public authService: Authentication,
    public checkoutService: CheckoutService
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

  confirm() {
    let loader = this._loadingCtrl.create();
    loader.present();

    this.checkoutService.confirm().subscribe(response => {

      if(response.operation == 'success') 
      {
        this.navCtrl
          .push(CheckoutCompletedPage)
          .then(() => {
            // first we find the index of the current view controller:
            const index = this.viewCtrl.index;
            // then we remove it from the navigation stack
            this.navCtrl.remove(index);
            this.navCtrl.remove(index - 1);//shipping page 
          });
      }
      else
      {
        let alert = this._alertCtrl.create({
          subTitle: response.message,
          buttons: ['Okay!']
        });
        alert.present();
      }

      loader.dismiss();
    });    
  }

  /**
   * method load cart items
   */
  loadCartList(){
    this.httpRequest.get(this._urlCart+'?offset=0').subscribe(list => {
      this.cartItems = list.items;
      this.summary = list.summary;
      this.delivery_vendors = list.summary.delivery_vendors;
    })
  }
}
