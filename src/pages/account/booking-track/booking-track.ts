import { Component } from '@angular/core';
import {NavParams, ViewController, ModalController } from 'ionic-angular';
import { BookingDetailPage } from '../booking-detail/booking-detail';
import { HttpService } from '../../../providers/http.service';

@Component({
  selector: 'page-booking-track',
  templateUrl: 'booking-track.html'
})

export class BookingTrackPage {

  public bookingToken: string;

  constructor(
    public _viewCtrl:ViewController,
    public _navParams:NavParams,
    public httpRequest: HttpService,
    public modalCtrl:ModalController
  ) {
    
  }

  loadBooking() {
      let modal = this.modalCtrl.create(BookingDetailPage, { booking_token: this.bookingToken });
      modal.present();
  }
}
