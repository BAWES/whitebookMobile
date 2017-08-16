import { ViewChild, Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ModalController, LoadingController, AlertController, ToastController, Slides } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
//Pages
import { ProductImagePage } from '../product-image/product-image';
import { ProductVideoPage } from '../product-video/product-video';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart';
import { SearchItemPage } from '../search-item/search-item';

//Services
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../providers/global.service';
import { CartService } from '../../providers/cart.service';
import { HttpService } from '../../providers/http.service';
import { Authentication } from '../../providers/auth.service';
import { ProductService } from '../../providers/product.service';
import { WishlistService } from '../../providers/logged-in/wishlist.service';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {

  @ViewChild(Slides) slides: Slides;

  public cartCount: number = 0;
  public productSection: string = "pdescription";
  public item_id: number;
  public product: any;
  public vendorAreaList: any;

  public timeslots: any = [];
  public quantity: number = 1;
  public maxQuantity: number = 0;
  public minQuantity: number = 1;
  public dateChange: boolean = false;
  public wishlistID: number = 0;
  public wishlistLbl: string;
  //form variables
  public productForm: FormGroup;
  public submitAttempt: boolean = false;

  public total: number;  
  public cartErrors: any = [];
  public isUserLogged: boolean = false;

  public currentTime;
  public todayStr;
  public todayDate;
  public maxDate;

  mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay: true,
    speed: 3000,
    pager: true
  };

  public defaultImage = 'assets/images/item-default.png';
  public imageOffset = 100;

  constructor(
    private _params: NavParams,
    public modalCtnl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public _config: GlobalService,
    public http: Http,
    public httpService: HttpService,
    public formBuilder: FormBuilder,
    public cartService: CartService,
    public translateService: TranslateService,
    public productService: ProductService,
    public wishlistService: WishlistService,
    public auth: Authentication,
    private youtube: YoutubeVideoPlayer,
    private socialSharing: SocialSharing
  ) {    
  }

  ionViewWillEnter() {
    
    this.setDates();

    this.item_id = this._params.get('productId');

    this.currentTime = new Date().getTime();

    this.isUserLogged = this.auth.getAccessToken();

    this.translateService.get('Add To Wishlist').subscribe(value => {
      this.wishlistLbl = value;
    });

    this.loadProductDetail();
    
    this.getCartCount();
    this.loadProductWishlistStatus()
  }

  share() {
    let message = this._config.translate(this.product.item.item_name, this.product.item.item_name_ar);
    let subject = 'WhiteBook';
    let file = '';
    let url = this._config.frontend + '/browse/detail/' + this.product.item.slug;
    this.socialSharing.share(message, subject, file, url).then(() => {
      // Success! 
    }).catch(() => {
      // Error!
    });
  }

  /**
	 * Sets the default dates for min/max validation
	 */
  setDates() {

    let today = new Date();

    today.setHours(0, 0, 0);
    this.todayStr = today.toISOString().substring(0, 10);

    var dd = today.getDate();
    var mm = today.getMonth(); // 0 is January, so we must add 1
    var yyyy = today.getFullYear();

    this.todayDate = new Date((yyyy), mm, dd).toISOString();
    this.maxDate = new Date((yyyy + 1), mm, dd).toISOString();
  }

  /**
   * method to open checkout cart page
   */
  openModel() {
    this.navCtrl.push(CheckoutCartPage);
  }

  getCartCount() {
    this.cartService.count().subscribe(data => {
      this.cartCount = data;
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

    console.log(this.productForm);

    if (this.productForm.valid) {

      let params = this.productForm.value;

      console.log(params);

      this.cartService.add(params).subscribe(data => {

        if (data.operation == 'success') {
          this.translateService.get('Item added to cart').subscribe(value => {
            let toast = this.toastCtrl.create({
              message: value,
              duration: 4000
            });
            toast.present();
          });

          //update cart count
          this.getCartCount();

          return true;
        }

        let msg = '';

        for (var i in data.message) {
          var value = data.message[i];
          for (var j in value) {
            msg += value[j] + "<br />";
          }
        }

        this.translateService.get('Add to cart').subscribe(value => {
          let alert = this.alertCtrl.create({
            title: value,
            subTitle: msg,
            buttons: ['OK']
          });
          alert.present();
        });

      });

    } else {
      this.translateService.get('Please check form carefully').subscribe(value => {
        let toast = this.toastCtrl.create({
          message: value,
          duration: 4000
        });
        toast.present();
      });
    }
  }

  /**
   * method to load product detail
   */
  loadProductDetail() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.productService.loadProductDetail(this.item_id).subscribe(
      response => {
        this.product = response;

        if (this.product.item.item_minimum_quantity_to_order > 0) {
          this.minQuantity = this.product.item.item_minimum_quantity_to_order;
        }

        if (this.product.item.included_quantity > this.minQuantity) {
          this.minQuantity = this.product.item.included_quantity;
        }

        this.quantity = this.minQuantity;

        this.loadProductArea(this.product.vendor.vendor_id);
        this.intiateForm();
        loading.dismiss();
      }
    );
  }

  intiateForm() {
    
    let formControls: any = {};

    this.product.menu.forEach((value, index) => {
      value.vendorItemMenuItems.forEach((menu_item, index) => {
        formControls['menu_item[' + menu_item.menu_item_id + ']'] = [
          menu_item.quantity_type == 'checkbox'? 1 : 0, []
        ];
      });
    });

    this.product.addons.forEach((value, index) => {
      value.vendorItemMenuItems.forEach((menu_item, index) => {
        formControls['menu_item[' + menu_item.menu_item_id + ']'] = [
          menu_item.quantity_type == 'checkbox'? 1 : 0, []
        ];
      });
    });

    formControls['item_id'] = [this.item_id, Validators.required];
    formControls['quantity'] = [this.quantity, Validators.required];
    formControls['area_id'] = ['', Validators.required];
    formControls['delivery_date'] = ['', Validators.required];
    formControls['time_slot'] = ['', Validators.required];
    formControls['female_service'] = [''];
    formControls['special_request'] = [''];
    
    this.productForm = this.formBuilder.group(formControls);

    this.loadFinalPrice();        
  }

  loadFinalPrice() {
    let params = this.productForm.value;
    this.productService.loadFinalPrice(params).subscribe(jsonResponse => {
      this.total = jsonResponse.total;
    });
  }

  /**
   * method to load product area
   */
  loadProductArea(vendor_id) {
    this.productService.loadProductArea(vendor_id).subscribe(result => {
      this.vendorAreaList = result;
    });
  }

  /**
   * method to load time slot 
   * for perticular vendor product
   */
  loadTimeSlot(vendor_id) {
    this.dateChange = true;
    this.productService.loadTimeSlot(
      vendor_id, 
      this.productForm.controls['delivery_date'].value, 
      this.currentTime, 
      this.todayStr
    ).subscribe(timeslots => {
      this.timeslots = timeslots;
      this.loadProductCapacity(); // loading product capacity
    });
  }

  /**
   *  method to increase quantity
   */
  add() {

    if (this.maxQuantity == 0) {

      let toast = this.toastCtrl.create({
        message: 'Please select delivery date firstly',
        duration: 2000
      });
      toast.present();

      return false;
    }

    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    } else {
      let toast = this.toastCtrl.create({
        message: 'Max Quantity Available is ' + this.maxQuantity,
        duration: 2000
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
        message: 'Please select delivery date',
        duration: 2000
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
    let control = this.productForm.controls['menu_item[' + menu_item_id + ']'];
    let qty = parseInt(control.value);
    if (qty > 0) {
      control.setValue(qty - 1);
      this.loadFinalPrice();
    }
  }

  /**
   *  method to increase menu item quantity
   */
  addMenuItemQty(menu_item_id) {
    let control = this.productForm.controls['menu_item[' + menu_item_id + ']'];
    control.setValue(parseInt(control.value) + 1);
    this.loadFinalPrice();
  }

  /**
   * method to reset all values on 
   * area changes
   */
  resetValues() {
    this.dateChange = false;
    this.timeslots = [];
    this.productForm.controls['delivery_date'].setValue('');
  }

  /**
   * method to load product capacity on 
   * date change
   */
  loadProductCapacity() {
    this.productService.productCapacity(
      this.item_id, 
      this.productForm.controls['delivery_date'].value
    ).subscribe(result => {
      this.maxQuantity = parseInt(result.capacity);
    });
  }

  /**
   * Play youtube video
   * @param video 
   */
  openVideo(video) {
    this.youtube.openVideo(video.video);
  }

  /**
   * load is product is in Wishlist
   * of user
   */
  loadProductWishlistStatus() {
    if (!this.isUserLogged) {
      return false;
    }

    this.wishlistService.getStatus(this.item_id).subscribe(jsonResponse => {
      this.wishlistID = jsonResponse;
      if (this.wishlistID > 0) {
        this.translateService.get('Remove From Wishlist').subscribe(value => {
          this.wishlistLbl = value;
        });
      }
    });
  }

  manageWishlist() {
    if (!this.isUserLogged) {
      this.translateService.get('Please login to manage wishlist').subscribe(value => {
        let alert = this.alertCtrl.create({
          message: value,
          buttons: ['OK']
        });
        alert.present();
      });
      return false;
    }

    if (this.wishlistID > 0) {
      this.removeFromWishList();
    } else {
      this.addToWishList();
    }
  }

  addToWishList() {
    this.wishlistService.add(this.item_id).subscribe(result => {

      if (result.operation == 'success') {
        this.translateService.get('Remove From Wishlist').subscribe(value => {
          this.wishlistLbl = value;
          this.wishlistID = result.id;
        });
      }

      let toast = this.toastCtrl.create({
        message: result.message,
        duration: 3000
      });
      toast.present();
    })
  }

  removeFromWishList() {
    this.wishlistService.delete(this.wishlistID).subscribe(result => {

      if (result.operation == 'success') {
        this.translateService.get('Add From Wishlist').subscribe(value => {
          this.wishlistLbl = value;
          this.wishlistID = 0;
        });
      }

      let toast = this.toastCtrl.create({
        message: result.message,
        duration: 3000
      });
      toast.present();
    })
  }

  openSearchModel() {
    let modal = this.modalCtnl.create(SearchItemPage);
    modal.present();
  }
  
  goToSlide(index, isVideo = false) {
    if(isVideo)
      index += this.product.images.length;
    this.slides.slideTo(index, 500);
  }

  productDetail(id) {
    this.navCtrl.push(ProductPage, { productId:id });
  }
}