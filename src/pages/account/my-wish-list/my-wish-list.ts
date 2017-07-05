import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { ProductPage } from '../../product/product';
import { HttpService } from '../../../providers/http.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../providers/global.service';

@Component({
  selector: 'page-my-wish-list',
  templateUrl: 'my-wish-list.html'
})

export class MyWishListPage {
  
  public _wishlistUrl: string = "/wishlist";
  public _categoryListUrl = '/category';
  public whishlist:any;
  public categoryList:any;
  public waiting:boolean=false;

  public start:number = 0;
  public category:number= 0;

  private txtRemoveTitle;
  private txtRemoveMessage;

  constructor(
    public navCtrl: NavController,
    public alertCtrl:AlertController,
    public toastCtrl : ToastController,
    public httpRequest: HttpService,
    public translateService: TranslateService,
    public _config: GlobalService
  ) {
    this.translateService.get('Remove wishlist product?').subscribe(value => {
      this.txtRemoveTitle = value;
    });
    this.translateService.get('Are you sure you want to remove product from wishlist?').subscribe(value => {
      this.txtRemoveMessage = value;
    });
  }

  /**
   * method will load on view load
   */
  ionViewDidLoad() {
    this.list();
    this.loadCategoryList();
  }

  /**
   * method to remove whishlist item
   */
  removeProduct(wishlist_id:number) {
    let url = this._wishlistUrl+'?wishlist_id='+wishlist_id + '&language=' + this.translateService.currentLang;
    let alert = this.alertCtrl.create({
      title : this.txtRemoveTitle,
      message : this.txtRemoveMessage,
      buttons : [
        {
          text: 'Yes',
          handler:() => {
            let result:any;
            this.httpRequest.delete(url).subscribe(data=>{
              result = data;
              this.list();
              let toast = this.toastCtrl.create({
                message : result.message,
                duration:300
              });
              toast.present();
            })
          }
        },
        {
          text: 'no',
          handler:() => {
            console.log('Product Saved');
          }
        }
      ]
    })
    alert.present();
  }

  /**
   * method to redirect on product detail page
   */
  productDetail(id) {
    this.navCtrl.push(ProductPage,{productId:id});
  }

  /*
  * Method will load list of events
  * at view load
  */
  list(start: number = 0) {
      this.waiting = true;
      let url = this._wishlistUrl +'?offset='+start+'&category_id='+this.category + '&language=' + this.translateService.currentLang;
      this.httpRequest.get(url).subscribe(data=>{
         this.whishlist = data;
         this.waiting = false;
      })
  }

  /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
    let items;
    this.start+=10;
    let url = this._wishlistUrl +'?offset='+this.start+'&category_id='+this.category + '&language=' + this.translateService.currentLang;
    this.httpRequest.get(url).subscribe(data=>{
        items = data;
        for(let item of items) {
          this.whishlist.push(item);
        }
      infiniteScroll.complete();
    })
  }

/**
 * method to show category listing
 */
  loadCategoryList() {
    let url = this._categoryListUrl + '?language=' + this.translateService.currentLang;
    this.httpRequest.get(url).subscribe(data=>{
         this.categoryList = data;
    });
  }

/**
 * filter method for product 
 * filter on category base
 */
  filterProduct() {
    this.list(0);
  }
}
