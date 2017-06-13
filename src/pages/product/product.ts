import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { ProductImagePage } from '../product-image/product-image';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart';

import { GlobalService } from '../../providers/global.service';
import { CartCountService } from '../../providers/cart.count.service';
import { CartService } from '../../providers/cart.service';
import { HttpService } from '../../providers/http.service';
import { Authentication } from '../../providers/auth.service';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {
  
  public _urlProductDetail = '';
  public _urlProductArea = '';
  public _urlProductCapacity = '';
  public _urlProductDeliveryTimeSlot = '';
  public _urlAddToCart = '';
  public _urlWishlist = '';
  public _urlFinalPrice = '';
  
  public productSection:string = "pdescription";
  public product_id:number;
  public product : any;
  public vendorAreaList: any;
  
  public timeslots:any = [];
  public quantity:number = 1;
  public maxQuantity:number = 0;
  public minQuantity:number = 1;
  public dateChange:boolean=false;
  public wishlistID:number=0;
  public wishlistLbl:string = 'Add To Wishlist';
  //form variables
  public productForm:FormGroup;
  public area:number;
  public myDate:any;
  public slots:any;
  public submitAttempt:boolean = false;
  public total: number;
  public menuItem: any = [];
  public female_service: number;
  public special_request: string;

  public cartErrors: any = [];

  public isUserLogged: boolean = false;

  public currentTime;
  public todayStr;
  public todayDate;
  public maxDate;

  mySlideOptions = {
      initialSlide: 1,
      loop: true,
      autoplay:true,
      speed :3000,
      pager : true
    };

  constructor(
    private _params: NavParams,
    public modalCtnl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public _config: GlobalService,
    public http: Http,
    public httpService: HttpService,
    public formBuilder: FormBuilder,
    public _cartCount:CartCountService,
    public cartService: CartService,
    public auth: Authentication
  ) {
    this.setDates();

    this.product_id = this._params.get('productId');
    
    this._urlProductDetail = this._config.apiBaseUrl + '/product/detail?product_id=';
    this._urlProductArea = this._config.apiBaseUrl + '/product/area?vendor_id=';
    this._urlProductCapacity = this._config.apiBaseUrl + '/product/capacity';
    this._urlProductDeliveryTimeSlot = this._config.apiBaseUrl + '/product/time-slot';
    this._urlAddToCart = this._config.apiBaseUrl + '/cart';
    this._urlFinalPrice = this._config.apiBaseUrl + '/product/final-price';
    this._urlWishlist = '/wishlist';
    
    this.currentTime = new Date().getTime();

    //form validation
    this.productForm = this.formBuilder.group({
        area: ['', Validators.required],
        myDate: ['', Validators.required],
        slots: ['', Validators.required],
      });

    this.isUserLogged = this.auth.getAccessToken();
  }

  /**
	 * Sets the default dates for min/max validation
	 */
	setDates(){
    
		let today = new Date();
		
    today.setHours(0,0,0);
    this.todayStr  = today.toISOString().substring(0,10);
    
    var dd = today.getDate();
		var mm = today.getMonth(); // 0 is January, so we must add 1
		var yyyy = today.getFullYear();

		this.todayDate = new Date((yyyy), mm, dd).toISOString();
		this.maxDate = new Date((yyyy + 1), mm, dd).toISOString();
	}

  ionViewDidLoad() {
    if (this.product_id) {
      this.loadProductDetail();
      this.loadProductWishlistStatus()
    }
  }
  
  /**
   * method to open checkout cart page
   */
  openModel() {
    let modal = this.modalCtnl.create(CheckoutCartPage);
    modal.present();
    modal.onDidDismiss(data => { 
      this._cartCount.loadCartCount();
    });
  }

  showImage(title: string, image: string) {    
    let params = {
      image: this._config.menu_item + '/' + image,
      title: title
    };
    let modal = this.modalCtnl.create(ProductImagePage, params);
    modal.present();
  }

  addToCart() {

    this.submitAttempt = true;
    
    if (this.productForm.valid) {
      
      let params = {
        'item_id': this.product_id,
        'time_slot': this.slots,
        'delivery_date': this.myDate,
        'quantity': this.quantity,
        'area_id': this.area,
        'menu_item': this.menuItem,
        'female_service': this.female_service,
        'special_request': this.special_request
      };

      this.cartService.add(params).subscribe(data => {
  
        if(data.operation == 'success') 
        {
          let toast = this.toastCtrl.create({
            message : 'Item added to cart',
            duration : 4000
          });
          toast.present();

          return true;
        }

        let msg = '';
 
        for (var i in data.message) {
          var value = data.message[i];
          for (var j in value) {
            msg += value[j] + "<br />";
          }
        }
        
        let alert = this.alertCtrl.create({
          title: 'Add to cart',
          subTitle: msg,
          buttons: ['OK']
        });
        alert.present();

      });

    } else {

      let toast = this.toastCtrl.create({
        message : 'Please check form carefully',
        duration : 4000
      });
      toast.present();
    }
  }

/**
 * method to load product detail
 */
  loadProductDetail() {
    this.http.get(this._urlProductDetail+this.product_id).subscribe(
      response => {
        this.product = response.json(); 

        if(this.product.item.item_minimum_quantity_to_order > 0) {
          this.minQuantity = this.product.item.item_minimum_quantity_to_order;  
        } 

        if(this.product.item.included_quantity > this.minQuantity) {
          this.minQuantity = this.product.item.included_quantity;  
        } 
  
        this.quantity = this.minQuantity;        

        //create menu item array to save menu item qty 

        this.product.menu.forEach((value, index) => {
          value.vendorItemMenuItems.forEach((menu_item, index) => {
             this.menuItem[menu_item.menu_item_id] = 0;  
          });
        });

        this.product.addons.forEach((value, index) => {
          value.vendorItemMenuItems.forEach((menu_item, index) => {
             this.menuItem[menu_item.menu_item_id] = 0;  
          });
        });

        this.loadFinalPrice();
        this.loadProductArea(this.product.vendor);
      }
    );
  }

  loadFinalPrice() {
    let param = {
      'item_id' : this.product_id,
      'quantity' : this.quantity,
      'menu_item' : this.menuItem
    }
    this.http.post(this._urlFinalPrice, param).subscribe(jsonResponse => {
      this.total = jsonResponse.json().total;
    });
  }

  /**
   * method to load product area
   */
  loadProductArea(vendor) {
    if (vendor) {
        this.http.get(this._urlProductArea + vendor.vendor_id).subscribe(areaList => {
        this.vendorAreaList = areaList.json();
      });
    }
  }
 
  /**
   * method to load time slot 
   * for perticular vendor product
   */
  loadTimeSlot(vendor_id) {
    this.dateChange = true;
    let url = this._urlProductDeliveryTimeSlot 
      + '?vendor_id='+vendor_id+'&event_date='+this.myDate+'&time='+this.currentTime+'&current_date='+this.todayStr;
    
    this.http.get(url).subscribe(timeslots=>{
      this.timeslots = timeslots.json();  
    });
    
    this.loadProductCapacity(); // loading product capacity
  }

  /**
   *  method to increase quantity
   */
  add() {
    
    if (this.maxQuantity == 0) {
    
      let toast = this.toastCtrl.create({
        message : 'Please select delivery date firstly',
        duration : 2000
      });
      toast.present();

      return false;
    } 

    if (this.quantity < this.maxQuantity ) {
      this.quantity++;
    }else{
      let toast = this.toastCtrl.create({
        message : 'Max Quantity Available is ' + this.maxQuantity,
        duration : 2000
      });
      toast.present();

      return false;
    }
  }

  /**
   *  method to decrease quantity
   */
  sub() {
    if (this.maxQuantity == 0) {
      let toast = this.toastCtrl.create({
        message : 'Please select delivery date',
        duration : 2000
      });
      toast.present();
    } else {
      if (this.quantity > this.minQuantity) {
        this.quantity--;
      }
    }
  }

  /**
   *  method to decrease menu item quantity
   */
  subMenuItemQty(menu_item_id) {    
    var qty = parseInt(this.menuItem[menu_item_id]);

    if(qty > 0) {
      this.menuItem[menu_item_id] = qty - 1; 
      this.loadFinalPrice();
    }       
  }

  /**
   *  method to increase menu item quantity
   */
  addMenuItemQty(menu_item_id) {    
    var qty = parseInt(this.menuItem[menu_item_id]);
    this.menuItem[menu_item_id] = qty + 1;
    this.loadFinalPrice();
  }
  
  /**
   * method to reset all values on 
   * area changes
   */
  resetValues() {
    this.dateChange = false;
    this.timeslots = [];
    this.myDate = '';
  }

  /**
   * method to load product capacity on 
   * date change
   */
  loadProductCapacity(){
    let url = this._urlProductCapacity+'?product_id='+this.product_id+'&deliver_date='+this.myDate;
    this.http.get(url).subscribe(jsonResponse => {
      this.maxQuantity = parseInt(jsonResponse.json().capacity);
    });
  }
  
  /**
   * load is product is in Wishlist
   * of user
   */
  loadProductWishlistStatus() 
  {
    if(!this.isUserLogged)
    {
      return false;
    }

    let url = this._urlWishlist+'/exist' +'?product_id='+this.product_id;
    this.httpService.get(url).subscribe(jsonResponse => {
      this.wishlistID = jsonResponse;
      if (this.wishlistID > 0) {
        this.wishlistLbl = 'Remove From Wishlist';
      }
    });
  }

  manageWishlist() {
      
      if(!this.isUserLogged)
      {
        let alert = this.alertCtrl.create({
          message: 'Please login to manage wishlist',
          buttons: ['OK']
        });
        alert.present();
        return false;
      }

      if (this.wishlistID > 0) {
        this.removeFromWishList();
      } else {
        this.addToWishList();
      }
  }

  addToWishList() {
    
    let param = {
      'item_id' : this.product_id
    }
    this.httpService.post(this._urlWishlist,param).subscribe(result => {
      
      if (result.operation == 'success'){
          this.wishlistLbl = 'Remove From Wishlist';
          this.wishlistID = result.id;
      }

      let toast = this.toastCtrl.create({
        message : result.message,
        duration : 3000
      });
      toast.present();
    })
  }
  
  removeFromWishList() {
    this.httpService.delete(this._urlWishlist + '?wishlist_id='+this.wishlistID).subscribe(result => {
      if (result.operation == 'success') {
          this.wishlistLbl = 'Add From Wishlist';
          this.wishlistID = 0;
      }
      let toast = this.toastCtrl.create({
        message : result.message,
        duration : 3000
      });
      toast.present();
    })
  }
}