import { Component } from '@angular/core';
import { NavParams, NavController, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Base } from '../../providers/base';
import { Http } from '@angular/http';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class Contact {
  
  private contactForm : FormGroup;
  public _urlContactUrl: string;
  public submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl : ToastController,
    private formBuilder: FormBuilder,
    private httpService: Http,
    public viewCtrl : ViewController,
    public _base : Base,
    public _config: GlobalService
  ) {

    this._urlContactUrl = this._config._ApiUrl + "/account/contact";

    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    
  }

  sendMail() 
  {
    this.submitAttempt = true;
    console.log(this.contactForm.value);
    if (this.contactForm.valid) {
      this._base.startLoading();
      let result;
      let paramas = {
        'name':this.contactForm.value.name,
        'email':this.contactForm.value.email,
        'msg':this.contactForm.value.description,
        }
        this.httpService.post(this._urlContactUrl,paramas).subscribe(data=>{
          result = data.json();
          if (result.operation == 'success' ) {
            let toast = this.toastCtrl.create({
              message: 'Mail Sent Successfully',
              duration: 3000
            });
            toast.present();
            this._base.endLoading()
            this.viewCtrl.dismiss();
          } else {
            let toast = this.toastCtrl.create({
              message: result.message,
              duration: 3000
            });
            toast.present();
            this._base.endLoading()
          }
      })
    }
  }
}
