import { ViewChild, Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ModalController, LoadingController, AlertController, ToastController, Slides } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

//Pages
import { ProductFormPage } from '../product-form/product-form';
import { ProductImagePage } from '../product-image/product-image';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart';
import { SearchItemPage } from '../search-item/search-item';

//Services
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../providers/global.service';
import { Authentication } from '../../providers/auth.service';
import { ProductService } from '../../providers/product.service';
import { WishlistService } from '../../providers/logged-in/wishlist.service';
import { CartService } from '../../providers/cart.service';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {

  @ViewChild(Slides) slides: Slides;

  public item_id: number;
  public product: any;

  public cartCount: number = 0;
  public productSection: string = "pdescription";
  public isUserLogged: boolean = false;
  
  public wishlistID: number = 0;
  public wishlistLbl: string;
  
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
    public translateService: TranslateService,
    public productService: ProductService,
    public cartService: CartService,
    public wishlistService: WishlistService,
    private youtube: YoutubeVideoPlayer,
    private socialSharing: SocialSharing,    
    public auth: Authentication
  ) {        
    this.isUserLogged = this.auth.getAccessToken();        
  }

  ionViewWillEnter() {
    this.item_id = this._params.get('productId');

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

  /**
   * method to load product detail
   */
  loadProductDetail() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.productService.loadProductDetail(this.item_id).subscribe(
      response => {
        this.product = response;
        loading.dismiss();
      }
    );
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

  openProductForm() {
    let modal = this.modalCtnl.create(ProductFormPage, { product: this.product });
    modal.onDidDismiss(data => {
      this.getCartCount();
    });
    modal.present();
  }
}