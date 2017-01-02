import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController } from 'ionic-angular';

import { CreateEventPage } from '../create-event/create-event';
/*
  Generated class for the MyEvents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html'
})
export class MyEventsPage {
  events:any[];
  title:string;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public modalCtrl : ModalController,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    this.title = 'Event Listing';
    this.events = [
      {'title' : 'Birthday Party', 'date':'2016-08-12','event_type':'Birthday','total_guest':'60','color':'primary'},
      {'title' : 'Wedding Party', 'date':'2016-09-27','event_type':'Wedding','total_guest':'100','color':'secondary'},
      {'title' : 'Friends Party', 'date':'2017-01-02','event_type':'Get together','total_guest':'15','color':'danger'},
      {'title' : 'Business Meeting', 'date':'2017-03-12','event_type':'Business Meet Up','total_guest':'15','color':'secondary'},
      {'title' : 'Tommorrow', 'date':'2016-12-29','event_type':'Tommorrow','total_guest':'22','color':'light'},
      {'title' : 'Other', 'date':'2016-12-29','event_type':'Other','total_guest':'22','color':'dark'},
      ];
  }

  create() {
    let modal = this.modalCtrl.create(CreateEventPage);
    modal.present();
  }

  update() {
    let modal = this.modalCtrl.create(CreateEventPage);
    modal.present();
  }
  delete(){
    let confirm = this.alertCtrl.create({
      title: 'Event Delete?',
      message: 'Are you sure you want to delete this Event permanently from our system?',
      buttons : [
        {
          text:'Yes',
          handler:() => {
            let toast = this.toastCtrl.create({
              message: 'Event Deleted successfully',
              duration: 3000
            });
            toast.present();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Item Saved');
          }
        }
      ]
    });
    confirm.present();
  }
}
