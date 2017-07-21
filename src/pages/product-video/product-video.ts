import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'product-video',
  templateUrl: 'product-video.html'
})
export class ProductVideoPage {
    
    public item;
    public video;
    public url;

    constructor(
        public navParams: NavParams,
        public viewCtrl : ViewController,
        public _config: GlobalService
    ){
        this.item = this.navParams.get('item');
        this.video = this.navParams.get('video');

        this.url = 'https://www.youtube.com/embed/' + this.video.video + '?rel=0&autoplay=1';
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}