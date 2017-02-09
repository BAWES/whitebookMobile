import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { ProductPage } from '../../product/product';
import { HttpService } from '../../../providers/http.service';

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
  constructor(
    public navCtrl: NavController,
    public alertCtrl:AlertController,
    public toastCtrl : ToastController,
    public httpRequest: HttpService
  ) {
  }

  ionViewDidLoad() {
    this.list();
    this.categoryListing();
  }

  removeProduct(wishlist_id:number) {
    let alert = this.alertCtrl.create({
      title : 'Remove wishlist product?',
      message : 'Are you sure you want to remove product from wishlist?',
      buttons : [
        {
          text: 'Yes',
          handler:() => {
            let result:any;
            this.httpRequest.delete(this._wishlistUrl+'?wishlist_id='+wishlist_id).subscribe(data=>{
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

  productDetail(id) {
    console.log('opening product detail page of id : '+id);
    this.navCtrl.push(ProductPage,{productId:id});
  }

  /*
  * Method will load list of events
  * at view load
  */
  list(start: number = 0) {
      this.waiting = true;
      this.httpRequest.get(this._wishlistUrl +'?offset='+start+'&category_id='+this.category).subscribe(data=>{
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
    this.httpRequest.get(this._wishlistUrl +'?offset='+this.start+'&category_id='+this.category).subscribe(data=>{
        items = data;
        for(let item of items) {
          this.whishlist.push(item);
        }
      infiniteScroll.complete();
    })
  }

  categoryListing() {
    this.httpRequest.get(this._categoryListUrl).subscribe(data=>{
         this.categoryList = data;
    });
  }

  filterProduct() {
    this.list(0);
  }
}
