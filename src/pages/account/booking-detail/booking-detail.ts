import { Component } from '@angular/core';
import { NavParams, NavController, ViewController, AlertController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

//Services 
import { GlobalService } from '../../../providers/global.service';
import { BookingService } from '../../../providers/booking.service';
import { TranslateService } from '@ngx-translate/core';

// Declaring cordova so we can use it for the plugin
declare var cordova: any;

@Component({
  selector: 'page-booking-detail',
  templateUrl: 'booking-detail.html'
})

export class BookingDetailPage {

  private _browser;
  private _browserLoadEvents;
  private _browserCloseEvents;

  public bookingDetail:any;

  constructor(    
    private inAppBrowser: InAppBrowser,
    public _viewCtrl:ViewController,
    public _navParams:NavParams,
    public navCtrl: NavController,
    public _config:GlobalService,
    public translateService: TranslateService,
    public bookingService: BookingService,
    public _alertCtrl : AlertController,
    private platform: Platform
  ) {
    this.detail(this._navParams.get('booking_token'));
  }

  dismiss () {
    this._viewCtrl.dismiss();
  }

  detail(booking_token) {
    this.bookingService.detail(booking_token).subscribe(data=>{
        this.bookingDetail = data;
    });
  }

  payNow(bookingToken) {
    // Load in app browser to billing portal with Authkey
    let billingUrl = this._config.apiBaseUrl + `/tap?booking_token=` + bookingToken + '&language=' + this.translateService.currentLang;
    this.loadUrl(billingUrl);
  }
    
  /**
   * Load Specified Url
   */
  loadUrl(url: string) {

    this._browser = this.inAppBrowser.create(
      url, 
      this._config.browserTarget,
      this._config.browserOptions
    );

    //browser.show();

    this._browserLoadEvents = this._browser.on("loadstop").subscribe((event) => {
      this._doActionBasedOnUrl(event);
    });

    // Keep track of browser if closed
    this._browserCloseEvents = this._browser.on("exit").subscribe(event => {
      // Browser closed, unsubscribe from previous observables
      this._browserLoadEvents.unsubscribe();
      this._browserCloseEvents.unsubscribe();
    });
  }
 
  /**
   * Parse url input, then do action based on that input
   * This function takes the access token from server response
   *
   * @param {string} url
   */
  private _doActionBasedOnUrl(event: any){

    let url = event.url;
    
    if(url.indexOf("success") !== -1){
      this._browser.close();
      
      let subTitle, button;

      this.translateService.get('We got your payment').subscribe(value => {
        subTitle = value;
      });
      
      this.translateService.get('Great!').subscribe(value => {
        button = value;
      });
      
      // Show Alert with success message
      let alert = this._alertCtrl.create({
        subTitle: subTitle,
        buttons: button
      });
      alert.present();
      
      //refresh page 
      this.navCtrl.pop();
    }

    if(url.indexOf("error") !== -1){
      this._browser.close();
      
      let subTitle, button;

      this.translateService.get('Payment not processed successfully').subscribe(value => {
        subTitle = value;
      });
      
      this.translateService.get('Okay!').subscribe(value => {
        button = value;
      });
      
      // Show Alert with success message
      let alert = this._alertCtrl.create({
        subTitle: subTitle,
        buttons: button
      });
      alert.present();
    }
  }
}
