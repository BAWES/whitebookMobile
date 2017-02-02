import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

import { ProductPage } from '../../product/product';

import { AuthHttpService } from '../../../providers/authhttp.service';
import { Global } from '../../../providers/global';

@Component({
  selector: 'page-my-wish-list',
  templateUrl: 'my-wish-list.html'
})
export class MyWishListPage {
  
  public whishlist:any;
  public _urlWishlistUrl: string = "/wishlist";
  public start:number = 0;

  constructor(
    public navCtrl: NavController,
    public alertCtrl:AlertController,
    public toastCtrl : ToastController,
    public _authHttpService: AuthHttpService,
    public _config:Global
  ) {}

  ionViewDidLoad() {
    this.list();
    this.whishlist = [
      {'productID':'1','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'productID':'2','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'productID':'3','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'productID':'4','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'productID':'5','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
      {'productID':'6','productTitle':'Food Service','productVendor':'Whitebook Vendor','productPrice':'20.111','image':'https://thewhitebook.s3.amazonaws.com/vendor_item_images_210/bread_846.jpg'},
    ]
  }

  remove() {
    this.alertCtrl.create({
      title : 'Remove wishlist product?',
      message : 'Are you sure you want to remove product from wishlist?',
      buttons : [
        {
          text: 'Yes',
          handler:() => {
            let toast = this.toastCtrl.create({
              message : 'Product Removed Successfully',
              duration:300
            });
            toast.present();
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
      this._authHttpService.get(this._urlWishlistUrl +'?offset='+start).then(data=>{
         this.whishlist = data;
         console.log(this.whishlist)
      })
  }

  /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
    let items;
     this.start+=10;
      this._authHttpService.get(this._urlWishlistUrl +'?offset='+this.start).then(data=>{
         items = data;
         for(let item of items) {
          this.whishlist.push(item);
        }
        infiniteScroll.complete();
      })
  }
}
