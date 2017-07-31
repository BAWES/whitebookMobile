import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
//Pages
import { ProductPage } from '../../product/product';
//Services
import { HttpService } from '../../../providers/http.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../providers/global.service';
import { ProductService } from '../../../providers/product.service';
import { WishlistService } from '../../../providers/logged-in/wishlist.service';

@Component({
  selector: 'page-my-wish-list',
  templateUrl: 'my-wish-list.html'
})

export class MyWishListPage {
  
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
    public wishlistService: WishlistService,
    public productService: ProductService,
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
    let alert = this.alertCtrl.create({
      title : this.txtRemoveTitle,
      message : this.txtRemoveMessage,
      buttons : [
        {
          text: 'Yes',
          handler:() => {
            let result:any;
            this.wishlistService.delete(wishlist_id).subscribe(data=>{
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
      this.wishlistService.list(start, this.category).subscribe(data=>{
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
    this.wishlistService.list(this.start, this.category).subscribe(data => {
        items = data;
        for(let item of items) {
          this.whishlist.push(item);
        }
        infiniteScroll.complete();
    });
  }

  /**
   * method to show category listing
   */
  loadCategoryList() {
    this.productService.getCategoryList().subscribe(data=>{
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
