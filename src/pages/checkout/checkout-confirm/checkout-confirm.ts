import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ViewController,  } from 'ionic-angular';
import { CheckoutShippingPage } from '../checkout-shipping/checkout-shipping';
import { CheckoutService } from '../../../providers/checkout.service';
import { CheckoutCompletedPage } from '../checkout-completed/checkout-completed';
import { CartService } from '../../../providers/cart.service';

@Component({
  selector: 'page-checkout-confirm',
  templateUrl: 'checkout-confirm.html'
})

export class CheckoutConfirmPage {

  public cartItems:any;
  public summary:any;
  public delivery_vendors:any;
  public start:number = 0;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl : ViewController,
    public _alertCtrl : AlertController,
    public _loadingCtrl: LoadingController,
    public checkoutService: CheckoutService,
    public cartService: CartService
    ) {
      
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
  loadCartList() {
    this.cartService.list().subscribe(list => {
      this.cartItems = list.items;
      this.summary = list.summary;
      this.delivery_vendors = list.summary.delivery_vendors;
    })
  }
}
