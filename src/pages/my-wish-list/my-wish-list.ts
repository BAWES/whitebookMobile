import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

/*
  Generated class for the MyWishList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-wish-list',
  templateUrl: 'my-wish-list.html'
})
export class MyWishListPage {
  whishlist:any[];
  constructor(
    public navCtrl: NavController,
    public alertCtrl:AlertController,
    public toastCtrl : ToastController
  ) {}

  ionViewDidLoad() {
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

}
