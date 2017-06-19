import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { BookingDetailPage } from '../booking-detail/booking-detail';

import { HttpService } from '../../../providers/http.service';

@Component({
  selector: 'page-my-bookings',
  templateUrl: 'my-bookings.html'
})
export class MyBookingsPage {

  public _urlBookingUrl: string = "/bookings";
  public bookingList:any;
  public start:number = 0;

  constructor(
    public modalCtrl: ModalController,
    public httpService: HttpService,
    public navCtrl: NavController
  ) { }

  ionViewWillEnter() {
    this.list();  
  }

  itemSelected(booking_token) {
    this.navCtrl.push(BookingDetailPage, { booking_token:booking_token });
  }

  list(start: number = 0) {
      this.httpService.get(this._urlBookingUrl +'?offset='+start).subscribe(data=>{
         this.bookingList = data;
      })
  }

   /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
    let bookings;
     this.start += 20;
      this.httpService.get(this._urlBookingUrl +'?offset='+this.start).subscribe(data=>{
         bookings = data;
         for(let booking of bookings) {
          this.bookingList.push(booking);
        }
        infiniteScroll.complete();
      })
  }
}
