import { Component } from '@angular/core';
import { NavController, AlertController, ViewController, ToastController } from 'ionic-angular';
// Pages
import { CheckoutShippingPage } from '../checkout-shipping/checkout-shipping';
import { CheckoutShippingGuestPage } from '../checkout-shipping-guest/checkout-shipping-guest';
// Services 
import { CartService } from '../../../providers/cart.service';
import { GlobalService } from '../../../providers/global.service';
import { Authentication } from '../../../providers/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-checkout-cart',
  templateUrl: 'checkout-cart.html',
})
export class CheckoutCartPage {

  public area_id: any;
  public event_time: string;
  public delivery_date: string;

  public timeslots: string[] = ['12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM'
    , '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM'
    , '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'
    , '11:00 AM', '11:30 AM', '12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'
    , '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
    , '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'
    , '11:00 PM', '11:30 PM'];

  public areas: any = [];

  public isUserLoggedIn = false;
  public cartItems:any;
  public summary:any;
  public delivery_vendors:any;
  public start:number=0;
  
  public errors: any[] = [];

  public minDate;
	public maxDate;

  public errorImage = 'assets/images/error-image.png';
  public defaultImage = 'assets/images/loading_spinner.gif';
  
  constructor(
    public navCtrl: NavController, 
    public viewCtrl : ViewController,
    public alertCtrl : AlertController,
    public toastCtrl : ToastController,
    public cartService: CartService,
    public authService: Authentication,
    public translateService: TranslateService,
    public _config: GlobalService,
    ) {
      this.isUserLoggedIn = this.authService.getAccessToken();

      this.area_id = window.localStorage.getItem('delivery-location');
      this.delivery_date = window.localStorage.getItem('delivery-date');
      this.event_time = window.localStorage.getItem('event_time');
      
      this.setDates();
    }

  ionViewDidLoad() {
    this.loadCartList();
    this.loadAreas();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  shippingModelPage() 
  {
    if(this.errors.length > 0)
    {
        let title, message, txtButton;

        this.translateService.get('Warning').subscribe(value => {        
          title = value;
        });

        this.translateService.get('Please check cart items').subscribe(value => {        
          message = value;
        });

        this.translateService.get('Okay!').subscribe(value => {        
          txtButton = value;
        });

        let alert = this.alertCtrl.create({
          title : title,
          message : message,
          buttons : [txtButton]
        });
        alert.present();  
    }
    else
    {
      this.goToShippingPage();
    }    
  }

  goToShippingPage() {
    if(this.isUserLoggedIn) {
      this.navCtrl.push(CheckoutShippingPage);
    } else {
      this.navCtrl.push(CheckoutShippingGuestPage);
    }    
  }

  /**
   * method load delivery area 
   */
  loadAreas() {
    this.cartService.loadAreas().subscribe(list => {
      this.areas = list;
    })
  }

  deliveryDataChanged() 
  {    
    window.localStorage.setItem('delivery-location', this.area_id);
    window.localStorage.setItem('delivery-date', this.delivery_date);
    window.localStorage.setItem('event_time', this.event_time);

    this.loadCartList();
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
  
  /**
	 * Sets the default dates for min/max validation
	 */
	setDates(){
    
		let today = new Date();
		
    today.setHours(0,0,0);
    //this.todayStr  = today.toISOString().substring(0,10);
    
    var dd = today.getDate();
		var mm = today.getMonth(); // 0 is January, so we must add 1
		var yyyy = today.getFullYear();

		this.minDate = new Date((yyyy), mm, dd).toISOString();
		this.maxDate = new Date((yyyy + 1), mm, dd).toISOString();
	}

  removeItem(cart_id) {

    let title, message;

    this.translateService.get('Remove cart item?').subscribe(value => {        
      title = value;
    });

    this.translateService.get('Are you sure you want to remove product from cart?').subscribe(value => {        
      message = value;
    });

    let alert = this.alertCtrl.create({
      title : title,
      message : message,
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
