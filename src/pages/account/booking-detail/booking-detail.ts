import { Component } from '@angular/core';
import { NavParams, NavController, ViewController, Events, AlertController } from 'ionic-angular';
import { GlobalService } from '../../../providers/global.service';
import { HttpService } from '../../../providers/http.service';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-booking-detail',
  templateUrl: 'booking-detail.html'
})

export class BookingDetailPage {

  private _browser;
  private _browserLoadEvents;
  private _browserCloseEvents;

  public bookingDetail:any;

  public _urlBookingEndpoint: string = "/bookings";
  
  constructor(    
    private inAppBrowser: InAppBrowser,
    public _viewCtrl:ViewController,
    public _navParams:NavParams,
    public navCtrl: NavController,
    public httpRequest: HttpService,    
    private _events: Events,
    public _config:GlobalService,
    public _alertCtrl : AlertController,
  ) {
    this.detail(this._navParams.get('booking_token'));
  }

  ionViewDidLoad() {
    console.log('Booking Detail Page');
  }

  dismiss () {
    this._viewCtrl.dismiss();
  }

  detail(booking_token) {
      this.httpRequest.get(this._urlBookingEndpoint + '/' + booking_token).subscribe(data=>{
         this.bookingDetail = data;
      })
  }

  payNow(bookingToken) {
    // Load in app browser to billing portal with Authkey
    let billingUrl = this._config._ApiUrl + `/tap?booking_token=` + bookingToken;
    this.loadUrl(billingUrl, true);
  }

  /**
   * Load Specified Url
   */
  loadUrl(url: string, trackActionsOnUrl:boolean = false){
    this._browser = this.inAppBrowser.create(url, this._config.browserTarget, this._config.browserOptions);

    // Close browser on Instagram account successfully added.
    if(trackActionsOnUrl){

      this._browser.on("loadstop", this._doActionBasedOnUrl);

      this._browser.on("loadstart", this._doActionBasedOnUrl);

      /*this._browser.on("loadstop").subscribe((event) => {
        this._doActionBasedOnUrl(event.url);
      });

      this._browser.addEventListener('exit', function(event){
        this._browser.removeEventListener('loadstop');
      });*/

      /*// Keep track of urls loaded
      this._browserLoadEvents = this._browser.on("loadstop");
      this._browserLoadEvents = this._browserLoadEvents.map(res => res.url).subscribe(url => {
        this._doActionBasedOnUrl(url);
      });

      // Keep track of browser if closed
      this._browserCloseEvents = this._browser.on("exit").subscribe(resp => {
        // Browser closed, unsubscribe from previous observables
        this._browserLoadEvents.unsubscribe();
        this._browserCloseEvents.unsubscribe();
      });*/
    }
  }
 
  /**
   * Parse url input, then do action based on that input
   * This function takes the access token from server response
   *
   * @param {string} url
   */
  private _doActionBasedOnUrl(event: any){

    var url = event.url;

    console.log('browser action based on url');

    if(url.indexOf("success") !== -1){
      this._browser.close();
      // Show Alert with success message
      let alert = this._alertCtrl.create({
        subTitle: 'We got your payment',
        buttons: ['Great!']
      });
      alert.present();

      //refresh page 
      this.navCtrl.pop();
    }

    if(url.indexOf("error") !== -1){
      this._browser.close();
      // Show Alert with success message
      let alert = this._alertCtrl.create({
        subTitle: 'Payment not processed successfully',
        buttons: ['Okay!']
      });
      alert.present();
    }
  }
}
