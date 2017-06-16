import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
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
  ) {
    
  }

  ionViewWillEnter() {
    this.list();  
  }

  itemSelected(booking_token) {
      let modal = this.modalCtrl.create(BookingDetailPage, { booking_token:booking_token });
      modal.present();
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
