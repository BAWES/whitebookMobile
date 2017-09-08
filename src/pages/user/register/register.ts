import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidFields } from '../../../validators/valid.fields';
//Pages
import { Home } from '../../home/home';
//Services
import { Authentication } from '../../../providers/auth.service';
import { Base } from '../../../providers/base';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm : FormGroup;
  registerData : any;
  submitAttempt : boolean = false;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private _authService: Authentication,
    private _baseService : Base,
    public translateService: TranslateService
    ) {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.compose([Validators.required,ValidFields.isValidEmail])],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        mobileNumber: ['', Validators.compose([Validators.required,ValidFields.isValidMobile])],
      },
        { validator: ValidFields.passwordMatch('password', 'confirmPassword') }
      );
    }
    
  dismiss() {
    this.navCtrl.pop();
  }

  registerSubmit() {
    this.submitAttempt = true;
    if (this.registerForm.valid) {
      this._baseService.startLoading();
      this._authService.createAccount(
        this.registerForm.value.firstName, 
        this.registerForm.value.lastName, 
        this.registerForm.value.email, 
        this.registerForm.value.password,
        this.registerForm.value.dob,
        this.registerForm.value.gender,
        this.registerForm.value.mobileNumber,
      )
      .subscribe(data=>{
        this.registerData = data;
        if (this.registerData.operation == 'error' ) {
          this._baseService.showToast(this.registerData.message,4000);
          this._baseService.endLoading();
        } else if (this.registerData.operation == 'success' ) {
          this.translateService.get('Registered Successfully. Please check your email for activation link').subscribe(value => {
            this._baseService.showToast(value, 4000);
          });
          setTimeout(() => {
            this._baseService.endLoading();
            this.navCtrl.pop();
          });
        }
      })
    }
  }

  register(source: string) {
    
        if(source == 'facebook') {
          this.fb.login(['public_profile', 'email'])
            .then(res => {
              this._authService.validateFbToken(res.authResponse.accessToken).subscribe(response => {
                if(response.operation == 'success') {
                  this._authService.setAccessToken(response.token, response.email);
                  this.translateService.get('Login Successfully').subscribe(value => {
                    this._baseService.showToast(value);
                  });
                  setTimeout(() => {
                    // this._baseService.endLoading();
                    this.navCtrl.setRoot(Home)
                  });
                } else {
                  this.translateService.get('Invalid token.').subscribe(value => {
                    this._baseService.showToast(value);
                  });
                }              
              }, err => {
                this.translateService.get('Error logging into Facebook').subscribe(value => {
                  this._baseService.showToast(value);
                });
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
