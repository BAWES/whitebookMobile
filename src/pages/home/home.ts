import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart'
import { ListingPage } from '../listing/listing';
import { ProductPage } from '../product/product';
import { HttpService } from '../../providers/http.service';
import { CartCountService } from '../../providers/cart.count.service';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {

  // public _urlCategory:string = '/category';
  public _urlThemeUrl:string = '/themes';
  public featureProduct:any[];
  public sliderSlides:any[];
  public categories:any;
  public themes:any;

  constructor(
    public navCtrl: NavController,
    public modalCtnl: ModalController,
    public httpService:HttpService,
    public _cartCount:CartCountService
    ) {
    this.loadThemeList();
  }

  mySlideOptions = {initialSlide: 1,loop: true,autoplay:true,speed :3000,pager : true};
  categorySlideOptions = {initialSlide: 1,loop: true,autoplay:false,speed :3000,slidesPerView: 2};
  
  openModel() {
    let modal = this.modalCtnl.create(CheckoutCartPage);
    modal.present();
    modal.onDidDismiss(data => { 
      this._cartCount.loadCartCount();
    });
  }

  showData(themeid:any) {
      this.navCtrl.push(ListingPage,{
      title : 'Product Listing',
      themeID:themeid
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

  loadThemeList(start:number = 0){
    this.httpService.get(this._urlThemeUrl,false).subscribe(themes => this.themes = themes);
  }
}
