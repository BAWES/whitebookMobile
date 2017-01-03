import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html'
})
export class CreateEventPage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl : ViewController,
    public toastCtrl : ToastController
  ) {}

  ionViewDidLoad() {
    console.log('Hello CreateEventPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  saveEvent() {
    let toast = this.toastCtrl.create({
        message: 'Event Saved Successfully',
        duration: 3000
      });
      toast.present();
      this.viewCtrl.dismiss();
  }
}
