import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { MenuController, NavController } from 'ionic-angular';
//Pages
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart'
import { ListingPage } from '../listing/listing';
//Services
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../providers/cart.service';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {

  public _urlThemeUrl:string = '';
  public featureProduct:any[];
  public sliderSlides:any[];
  public categories:any;
  public themes:any;
  public themeID: any;
  public cartCount:number = 0;
  
  public selectOptions = {
  //  title: 'Whats your occasion?'
  };

  constructor(
    public navCtrl: NavController,
    public httpService: Http,
    public cartService: CartService,
    public _config: GlobalService,
    public translateService: TranslateService,
    public menuCtrl: MenuController
    ) {
    this._urlThemeUrl = this._config.apiBaseUrl + '/themes';
    this.loadThemeList();

    this.menuCtrl.enable(true, 'menu1');
    //  this.menuCtrl.enable(true, 'menu2');
 
  }
  
  ionViewWillEnter() {    
    this.getCartCount();
  } 

  mySlideOptions = {initialSlide: 1,loop: true,autoplay:true,speed :3000,pager : true};
  categorySlideOptions = {initialSlide: 1,loop: true,autoplay:false,speed :3000,slidesPerView: 2};
  
  gotoCart() {
    this.navCtrl.push(CheckoutCartPage);
  }
  
  getCartCount() {
    this.cartService.count().subscribe(data => {
      this.cartCount = data;
    });
  }

  showData() {
      this.navCtrl.push(ListingPage,{
        title : 'Product Listing',
        themeID: this.themeID
      });
  }

  // ionViewDidLoad() {
  //   this.featureProduct = [
  //     {'title':'Food','category':'food','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
  //     {'title':'Food','category':'food','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
  //     {'title':'Food','category':'food','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
  //     {'title':'Food','category':'food','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
  //   ];

  //   this.sliderSlides = [
  //     {'image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
  //     {'image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
  //     {'image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'}
  //   ];
  // }

  // loadProducts(title,id) {
  //   this.navCtrl.push(ListingPage,{
  //     title : title,
  //     id:id
  //   });
  // }

  // loadProduct(title) {
  //   this.navCtrl.push(ProductPage,{
  //       title : title,
  //   });
  // }

  /*
  * load category list
  */
  // loadCategoryList(start:number = 0){
  //   this.httpService.get(this._urlCategory +'?offset='+start,false).subscribe(cateries => this.categories = cateries);
  // }

  loadThemeList(start:number = 0) {
    this.httpService.get(this._urlThemeUrl,false).subscribe(jsonResponse => {
      this.themes = jsonResponse.json();
    });
  }
}
