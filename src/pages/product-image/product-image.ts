import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'product-image',
  templateUrl: 'product-image.html'
})
export class ProductImagePage {
    
    public image: string;
    public title: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl : ViewController,
    ){
        this.title = this.navParams.get('title');
        this.image = this.navParams.get('image');

        console.log(this.image);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}