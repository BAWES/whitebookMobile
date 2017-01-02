import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';

/*
  Generated class for the CreateEvent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
