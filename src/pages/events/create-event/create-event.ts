import { Component } from '@angular/core';
import { NavParams, NavController, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AuthHttpService } from '../../../providers/authhttp.service';

@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html'
})
export class CreateEventPage {
  
  public _urlEventUrl: string = "/event";
  public _urlEventDetailUrl: string = "/event/detail?event_id=";
  public _urlEventTypeListUrl: string = "/event/type";

  public eventTitle:string = 'Create New Event';
  public eventForm : FormGroup;
  public submitAttempt: boolean = false;
  public eventID:number;
  public eventTypeList:any;

  public eventName:string = '';
  public eventDate:any = '';
  public eventType:string = '';
  public eventGuest:number;

  constructor(
    public navCtrl: NavController,
    public viewCtrl : ViewController,
    public toastCtrl : ToastController,
    private formBuilder: FormBuilder,
    private _authHttpService: AuthHttpService,
    private _navParams: NavParams
  ) {
    this.eventForm = this.formBuilder.group({
        eventName: ['', Validators.required],
        eventDate: ['', Validators.required],
        eventType: ['', Validators.required],
        eventGuest: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    this.loadEventType();
    this.eventID = this._navParams.get("event_id")
    if (this.eventID != 0) {
      this.eventTitle = 'Update Event';
      this.loadEventDetail(this.eventID);
    }
  }

  /*
  * Method event will be used to dismiss modal/view
  */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /*
  * Method event will use to save or update event
  */
  saveEvent() {
    this.submitAttempt = true;
    console.log(this.eventForm.value);
    if (this.eventForm.valid) {
      let paramas = {
        'name':this.eventForm.value.eventName,
        'date':this.eventForm.value.eventDate,
        'type':this.eventForm.value.eventType,
        'no_of_guests':this.eventForm.value.eventGuest
        }
        if (this.eventID != 0) {
          let paramas = {
            'name':this.eventForm.value.eventName,
            'date':this.eventForm.value.eventDate,
            'type':this.eventForm.value.eventType,
            'no_of_guests':this.eventForm.value.eventGuest,
            'event_id':this.eventID
            }
          this.updateEvent(paramas);
        } else {
          this.createEvent(paramas);
        }
    }
  }

  /*
  * Method will load data using api 
  * and will send to form
  */
  loadEventDetail(event_id : number) {
    let eventDetail;
    this._authHttpService.get(this._urlEventDetailUrl+event_id).then(data=>{
        eventDetail = data;
        this.eventName=eventDetail.event_name;
        this.eventDate=eventDetail.event_date;
        this.eventType=eventDetail.event_type;
        this.eventGuest=eventDetail.no_of_guests;
        console.log(eventDetail);
    })
  }

  /*
  * Method will load event type list
  */
  loadEventType() {
    this._authHttpService.get(this._urlEventTypeListUrl).then(data=>{
        this.eventTypeList = data;
    })
  }


  /*
  * private Method will use to create event
  */
  private createEvent(paramas){
    let result;
    this._authHttpService.post(this._urlEventUrl,paramas).then(data=>{
        result = data;
        if (result.operation == 'success' ) {
          let toast = this.toastCtrl.create({
            message: 'Event Saved Successfully',
            duration: 3000
          });
          toast.present();
          this.viewCtrl.dismiss();
        } else {
          let toast = this.toastCtrl.create({
            message: result.message,
            duration: 3000
          });
          toast.present();
        }
      })
  }

  /*
  * private Method will use to update event
  */
  private updateEvent(paramas) {
    let result;
    this._authHttpService.patch(this._urlEventUrl,paramas).then(data=>{
        result = data;
        if (result.operation == 'success' ) {
          let toast = this.toastCtrl.create({
            message: 'Event Updated Successfully',
            duration: 3000
          });
          toast.present();
          this.viewCtrl.dismiss();
        } else {
          let toast = this.toastCtrl.create({
            message: result.message,
            duration: 3000
          });
          toast.present();
        }
      })
  }
}
