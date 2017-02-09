import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../../../providers/http.service';

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})

export class MyAccountPage {

  public _urlProfileUrl:string = '/account'
  public profileForm:FormGroup;    
  public submitAttempt: boolean = false;

  public firstName:string;
  public lastName:string;
  public email:string;
  public dob:any;
  public gender:string;
  public mobile:number;

  constructor(
    public toastCtrl:ToastController,
    public formBuilder: FormBuilder,
    public httpService: HttpService
    ) {
       this.profileForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        mobile: ['', Validators.required],
      });
    }

  ionViewDidLoad() {
    this.getProfile();  
  }

  /*
  * Method will load list of events
  * at view load
  */
  getProfile() {
    let profileDetail:any;
      this.httpService.get(this._urlProfileUrl).subscribe(data=>{
         profileDetail = data;
         this.firstName = profileDetail.customer_name;
         this.lastName = profileDetail.customer_last_name;
         this.email = profileDetail.customer_email;
         this.dob = profileDetail.customer_dateofbirth;
         this.gender = profileDetail.customer_gender;
         this.mobile = profileDetail.customer_mobile;
      })
  }

  saveProfile() {
    let result;
    this.submitAttempt = true;
    console.log(this.profileForm.valid);
    if (this.profileForm.valid) {
      let paramas = {
        'customer_name':this.profileForm.value.firstName,
        'customer_last_name':this.profileForm.value.lastName,
        'customer_email':this.profileForm.value.email,
        'customer_gender':this.profileForm.value.gender,
        'customer_mobile':this.profileForm.value.mobile,
        'customer_dateofbirth':this.profileForm.value.dob
      }
      this.httpService.patch(this._urlProfileUrl,paramas).subscribe(data=>{
      result = data;
      let toast = this.toastCtrl.create({
        message: result.message,
        duration: 3000
      });
      toast.present();  
      })
    }
  }
}