import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { BookingDetailPage } from '../booking-detail/booking-detail';
import { TranslateService } from '@ngx-translate/core';
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
    public navCtrl: NavController,
    public translateService: TranslateService,
  ) { }

  ionViewWillEnter() {
    this.list();  
  }

  itemSelected(booking_token) {
    this.navCtrl.push(BookingDetailPage, { booking_token:booking_token });
  }

  list(start: number = 0) {
     let url = this._urlBookingUrl + '?offset=' + start + '&language=' + this.translateService.currentLang;
      this.httpService.get(url).subscribe(data=>{
         this.bookingList = data;
      })
  }

   /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
    let url = this._urlBookingUrl + '?offset=' + this.start + '&language=' + this.translateService.currentLang;
    let bookings;
     this.start += 20;
      this.httpService.get(url).subscribe(data=>{
         bookings = data;
         for(let booking of bookings) {
          this.bookingList.push(booking);
        }
        infiniteScroll.complete();
      })
  }
}
