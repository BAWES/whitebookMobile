import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { BookingDetailPage } from '../booking-detail/booking-detail';

@Component({
  selector: 'page-booking-track',
  templateUrl: 'booking-track.html'
})

export class BookingTrackPage {

  public bookingToken: string;

  constructor(
    public modalCtrl:ModalController
  ) { }

  loadBooking() {
      let modal = this.modalCtrl.create(BookingDetailPage, { booking_token: this.bookingToken });
      modal.present();
  }
}
