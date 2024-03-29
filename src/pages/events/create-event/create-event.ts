import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
//Services
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../../providers/http.service';

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
    public viewCtrl : ViewController,
    public toastCtrl : ToastController,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private _navParams: NavParams,
    private translateService: TranslateService
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
      this.translateService.get('Update Event').subscribe(value => {
        this.eventTitle = value;
      });      
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
    this.httpService.get(this._urlEventDetailUrl+event_id).subscribe(data=>{
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
    this.httpService.get(this._urlEventTypeListUrl).subscribe(data=>{
        this.eventTypeList = data;
    })
  }


  /*
  * private Method will use to create event
  */
  private createEvent(paramas){
    let result;
    this.httpService.post(this._urlEventUrl,paramas).subscribe(data=>{
        result = data;
        if (result.operation == 'success' ) {
          
          this.translateService.get('Event Saved Successfully').subscribe(value => {
            let toast = this.toastCtrl.create({
              message: value,
              duration: 3000
            });
            toast.present();
          });
          
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
    this.httpService.patch(this._urlEventUrl,paramas).subscribe(data=>{
        result = data;
        if (result.operation == 'success' ) {
          
          this.translateService.get('Event Updated Successfully').subscribe(value => {
            let toast = this.toastCtrl.create({
              message: value,
              duration: 3000
            });
            toast.present();
          });
          
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
