import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'product-image',
  templateUrl: 'product-image.html'
})
export class ProductImagePage {
    
    public image: string;
    public title: string;

    constructor(
        public navParams: NavParams,
        public viewCtrl : ViewController,
    ){
        this.title = this.navParams.get('title');
        this.image = this.navParams.get('image');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}