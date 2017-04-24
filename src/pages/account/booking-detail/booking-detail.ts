import { Component } from '@angular/core';
import {NavParams, ViewController } from 'ionic-angular';

import { HttpService } from '../../../providers/http.service';

@Component({
  selector: 'page-booking-detail',
  templateUrl: 'booking-detail.html'
})

export class BookingDetailPage {

  public _urlBookingEndpoint: string = "/bookings";
  
  public bookingDetail:any;
  
  constructor(
    public _viewCtrl:ViewController,
    public _navParams:NavParams,
    public httpRequest: HttpService,
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
}
