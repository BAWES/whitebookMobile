import { Component } from '@angular/core';
import { NavController, NavParams,ModalController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart'
import { GlobalService } from '../../providers/global.service';
import { HttpService } from '../../providers/http.service';
import { CartCountService } from '../../providers/cart.count.service';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {
  
  public _urlProductDetail = '/product/detail?product_id=';
  public _urlProductArea = '/product/area?vendor_id=';
  public _urlProductCapacity = '/product/capacity';
  public _urlProductDeliveryTimeSlot = '/product/time-slot';
  public _urlAddToCart = '/cart';
  public _urlWishlist = '/wishlist';

  public productSection:string = "pdescription";
  public product_id:number;
  public product : any;
  public vendorAreaList: any;
  public minDate:any;
  public today:any;
  public todayStr:any;
  public currentTime:any;
  public timeslots:any = [];
  public quantity:number;
  public maxQuantity:number = 0;
  public minQuantity:number;
  public dateChange:boolean=false;
  public wishlistID:number=0;
  public wishlistLbl:string = 'Add To Wishlist';
  //form variables
  public productForm:FormGroup;
  public area:number;
  public myDate:any;
  public slots:any;
  public submitAttempt:boolean = false;

  mySlideOptions = {
      initialSlide: 1,
      loop: true,
      autoplay:true,
      speed :3000,
      pager : true
    };

  constructor(
    public navCtrl: NavController,
    private _params: NavParams,
    public modalCtnl: ModalController,
    public toastCtrl: ToastController,
    public _config: GlobalService,
    public httpService: HttpService,
    public formBuilder: FormBuilder,
    public _cartCount:CartCountService
  ) {
    this.product_id = this._params.get('productId');
    
    // to set min and max value for datepicker
    this.today = new Date();
    this.today.setHours(0,0,0);
    this.todayStr  = this.today.toISOString().substring(0,10);
    // this.myDate = this.todayStr;
    this.currentTime = new Date().getTime();

    //form validation
    this.productForm = this.formBuilder.group({
        area: ['', Validators.required],
        myDate: ['', Validators.required],
        slots: ['', Validators.required],
      });
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

  addToCart() {
    this.submitAttempt = true;
    
    if (this.productForm.valid) {
      let result;
      let params = {
        'item_id': this.product_id,
        'timeslot_id': this.slots,
        'delivery_date': this.myDate,
        'quantity': this.quantity,
        'area_id': this.area
      };
      this.httpService.post(this._urlAddToCart,params).subscribe(data=>{
        result = data;
        let toast = this.toastCtrl.create({
          message : result.message,
          duration : 4000
        });
        toast.present();
      });
    }
  }

  manageWishlist() {
      if (this.wishlistID > 0) {
        this.removeFromWishList();
      } else {
        this.addToWishList();
      }
  }

  addToWishList() {
    let result;
    let param = {
      'product_id' : this.product_id
    }
    this.httpService.post(this._urlWishlist,param).subscribe(wishlist=>{
      result = wishlist;
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
    let result;
    this.httpService.delete(this._urlWishlist + '?wishlist_id='+this.wishlistID).subscribe(wishlist=>{
      result = wishlist;
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

/**
 * method to load product detail
 */
  loadProductDetail() {
    this.httpService.get(this._urlProductDetail+this.product_id).subscribe(
      data => {
        this.product = data;
        this.quantity = this.product.item_minimum_quantity_to_order;
        this.minQuantity = this.product.item_minimum_quantity_to_order;
        this.loadProductArea(this.product.vendor)
      }
    );
  }

  /**
   * method to load product area
   */
  loadProductArea(product) {
    if (product) {
        this.httpService.get(this._urlProductArea+product.vendor_id).subscribe(areaList=>{
        this.vendorAreaList = areaList;
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
      + '?vendor_id='+vendor_id+'&date='+this.myDate+'&time='+this.currentTime+'&current_date='+this.todayStr;
      this.httpService.get(url).subscribe(timeslots=>{
        this.timeslots = timeslots;  
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
    } else {
      if (this.quantity < this.maxQuantity ) {
        this.quantity++;
      }
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
      this.httpService.get(url).subscribe(capacity=>{
        this.maxQuantity = capacity;
      });
  }

  
  /**
   * load is product is in Wishlist
   * of user
   */
  loadProductWishlistStatus() {
    let url = this._urlWishlist+'/exist' +'?product_id='+this.product_id;
    this.httpService.get(url).subscribe(wishtlist=>{
      this.wishlistID = wishtlist;
      if (this.wishlistID > 0) {
        this.wishlistLbl = 'Remove From Wishlist';
      }
    });
  }
}