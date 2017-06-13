import { Component } from '@angular/core';
import { AlertController, ModalController, ToastController } from 'ionic-angular';

import { CreateEventPage } from '../create-event/create-event';

import { HttpService } from '../../../providers/http.service';

@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html'
})
export class MyEventsPage {
  
  public _urlEventUrl: string = "/event";
  
  public events:any;
  public title:string;
  public resultData :any;
  public start:number = 0;

  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public httpService: HttpService
  ) {
    this.start=0;
    this.list();
  }

  ionViewDidLoad() {
    this.title = 'Event Listing'; 
  }

  /*
  * Method will open popup for create event
  */
  create() {
    let modal = this.modalCtrl.create(CreateEventPage,{ event_id: 0 });
    modal.present();
    
    // reintiate pagination from 0
    modal.onDidDismiss(data => { 
       this.start = 0;
       this.list(); // load list again
    });
  }

  /*
  * Method will open popup for update event
  */
  update(event) {
    let modal = this.modalCtrl.create(CreateEventPage,{ event_id: event.event_id });
    modal.present();
    modal.onDidDismiss(data => { 
       this.start = 0;
       this.list(); // load list again
    });
  }

 /*
  * Method will delete event 
  */
  delete(events){
    let response;
    let confirm = this.alertCtrl.create({
      title: 'Event Delete?',
      message: 'Are you sure you want to delete this Event permanently from our system?',
      buttons : [
        {
          text:'Yes',
          handler:() => {
            this.httpService.delete(this._urlEventUrl+'?event_id='+events.event_id).subscribe(data=>{
              response = data;
              this.list();
              let toast = this.toastCtrl.create({
                message: response.operation.message,
                duration: 3000
              });
              toast.present();
            })
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
  
  /*
  * Method will load list of events
  * at view load
  */
  list(start: number = 0) {
      this.httpService.get(this._urlEventUrl +'?offset='+start).subscribe(data=>{
         this.events = data;
      })
  }

  /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
    let events;
     this.start+=10;
      this.httpService.get(this._urlEventUrl +'?offset='+this.start).subscribe(data=>{
         events = data;
         for(let person of events) {
          this.events.push(person);
        }
        infiniteScroll.complete();
      })
  }
}
