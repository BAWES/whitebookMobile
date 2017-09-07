import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//Pages
import { BookingDetailPage } from '../booking-detail/booking-detail';
//Services
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../../providers/http.service';
import { BookingService } from '../../../providers/booking.service';

@Component({
  selector: 'page-my-bookings',
  templateUrl: 'my-bookings.html'
})
export class MyBookingsPage {

  public _urlBookingUrl: string = "/bookings";
  public bookingList:any;
  public start:number = 0;

  constructor(
    public httpService: HttpService,
    public navCtrl: NavController,
    public translateService: TranslateService,
    public bookingService: BookingService
  ) { }

  ionViewWillEnter() {
    this.list();  
  }

  itemSelected(booking_token) {
    this.navCtrl.push(BookingDetailPage, { booking_token:booking_token });
  }

  list(start: number = 0) {
    this.bookingService.list(start).subscribe(data=>{
       this.bookingList = data;
    });
  }

  /*
   * Method perform infinite scroll which 
   * will load more data just like pagination
   */
  doInfinite(infiniteScroll) {
    let bookings;
    this.start += 20;
    this.bookingService.list(this.start).subscribe(bookings => {
      for(let booking of bookings) {
        this.bookingList.push(booking);
      }
      infiniteScroll.complete();
    });
  }
}
