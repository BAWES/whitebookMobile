import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { ForgotPasswordPage } from '../forgot-password/forgot-password'
import { RegisterPage } from '../register/register';
import { Home } from '../../home/home';

import { Authentication } from '../../../providers/auth.service';

import { Base } from '../../../providers/base';
import { GlobalService } from '../../../providers/global.service';
import { ValidFields } from '../../../validators/valid.fields';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  private _browser;
  private _browserLoadEvents;
  private _browserCloseEvents;

  loginForm: FormGroup;
  loginData: any;
  submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public formBuilder: FormBuilder,
    public _authService: Authentication,
    public _baseService: Base,
    private googlePlus: GooglePlus,
    public _config: GlobalService,
    private platform: Platform,
    private fb: Facebook
  ){

    this._authService.logout();

    this.loginForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required,ValidFields.isValidEmail])],
      'password': ['', Validators.required],
    });
  }

  loginSubmit() {
    this.submitAttempt = true;
    if (this.loginForm.valid) {
        // this._baseService.startLoading();
        this._authService.login(this.loginForm.value.email,this.loginForm.value.password)
        .subscribe(data=>{
            this.loginData = data;
            if (this.loginData.status == 401 ) {
              this._baseService.showToast('Invalid Login Credentials.');
              // this._baseService.endLoading();
            } else if (this.loginData.operation == 'success' ) {
              this._authService.setAccessToken(this.loginData.token, this.loginForm.value.email);
              this._baseService.showToast('Login Successfully');
              setTimeout(() => {
                // this._baseService.endLoading();
                this.navCtrl.setRoot(Home)
              });
            }
        }, (error) => {
          this._baseService.showToast('Invalid Login Credentials.');
        });
      }
  }

  forgetPasswordPage() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  registerPage() {
    this.navCtrl.push(RegisterPage);
  }

  login(source: string) {

    if(source == 'facebook') {
      this.fb.login(['public_profile', 'email'])
        .then(res => {
          this._authService.validateFbToken(res.authResponse.accessToken).subscribe(response => {
            if(response.operation == 'success') {
              this._authService.setAccessToken(response.token, response.email);
              this._baseService.showToast('Login Successfully');
              setTimeout(() => {
                // this._baseService.endLoading();
                this.navCtrl.setRoot(Home)
              });
            } else {
              this._baseService.showToast('Invalid token.');
            }              
          }, err => {
            this._baseService.showToast('Error logging into Facebook');
          });    
        })
        .catch(e => console.log('Error logging into Facebook', e));    
    } else {
      this.googlePlus.login({
        //'scopes': '... ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '941345147978-jhe17gcptckamm90lqdj7je0r34424of.apps.googleusercontent.com'
        //763967388698-rqkkus8f613ef7mji5of2le6bdog9b3p.apps.googleusercontent.com', 
        //882152609344-ahm24v4mttplse2ahf35ffe4g0r6noso.apps.googleusercontent.com
        //763967388698-khv64ob8aq5a04hv81q1ub1u6plcsuv7.apps.googleusercontent.com
        // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        //'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(res => {
        console.log(JSON.stringify(res));
      })
      .catch(error => {
        console.error('Error logging ', JSON.stringify(error));
      });  
    }
  }
}