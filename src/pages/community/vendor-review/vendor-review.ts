import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

//models 
import { Vendor } from '../../../models/vendor';

//services 
import { HttpService } from '../../../providers/http.service';
import { GlobalService } from '../../../providers/global.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-vendor-review',
  templateUrl: 'vendor-review.html'
})
export class VendorReviewPage {

    public reviewSubmitted: boolean = false; 
    
    public vendor: Vendor;

    //rating 
    public score = 1;
    public max = 5;
    public iconEmpty: string = 'star-outline';
	public iconFull: string = 'star';
    
    reviewForm : FormGroup;

    constructor(
        public navCtrl: NavController, 
        public viewCtrl : ViewController,
        public alertCtrl : AlertController,
        public httpService: HttpService,
        private formBuilder: FormBuilder,
        private navParams: NavParams,
        public _config: GlobalService,
        public translateService: TranslateService
    ) {
        this.vendor = this.navParams.get('vendor');
        
        this.reviewForm = this.formBuilder.group({
            rating: [this.score, Validators.required],
            review: ['', Validators.required]
        });
    }
    
    public icons(): string[] {
		let step = 0.5;
		let score = Math.ceil(this.score / step) * step;

		let icons = [];
		for (let i = 1; i <= this.max; i++) {
			if (i <= score) {
				icons.push(this.iconFull);
			} else {
				icons.push(this.iconEmpty);
			}
		}
		return icons;
    }    

    updateRating(i) {
        this.score = i + 1;    
    }
        
    dismiss() {
        this.viewCtrl.dismiss({ 'reviewSubmitted': this.reviewSubmitted });
    }

    submit() {
        let url = "/community/review?language=" + this.translateService.currentLang;
        let params = {
            'rating': this.score,
            'review': this.reviewForm.value.review,
            'vendor_id': this.vendor.vendor_id
        };        
        this.httpService.post(url, params, true).subscribe(json => {      
            if(json.operation == 'success') {
                let alert = this.alertCtrl.create({
                    message: json.message
                });
                alert.present();
                this.reviewSubmitted = true;
                this.dismiss();
            } else {

                var html = '';

                for (let i in json.message) {
                    for (let j of json.message[i]) {
                        html += j + '<br />';
                    }
                }

                let prompt = this.alertCtrl.create({
                    message: html,
                    buttons: ["Ok"]
                });
                prompt.present();
            }
        });
    }
}