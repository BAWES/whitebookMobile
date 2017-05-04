import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HttpService } from '../../providers/http.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

//Services
import { VendorService } from '../../providers/vendor.service';
import { Base } from '../../providers/base';

@Component({
  selector: 'become-vendor',
  templateUrl: 'become-vendor.html'
})
export class BecomeVendorPage {

  becomeVendorForm : FormGroup;

  public submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public modalCtnl: ModalController,
    public httpService:HttpService,
    private fb: FormBuilder,
    private vendorService: VendorService,
    private _baseService : Base
    ) { 
    
    this.becomeVendorForm = this.fb.group({
        business: ['', Validators.required],
        name: ['', Validators.required],
        mobile: ['', Validators.required],
        email: ['', Validators.required],
        licence: ['', Validators.required],
        description: ['', Validators.required]
      });
  }

  submit() {

    this.submitAttempt = true;

    if (this.becomeVendorForm.valid) {
      this._baseService.startLoading();

      this.vendorService.vendorRequest(
        this.becomeVendorForm.value.business,
        this.becomeVendorForm.value.name,
        this.becomeVendorForm.value.mobile, 
        this.becomeVendorForm.value.email, 
        this.becomeVendorForm.value.licence,
        this.becomeVendorForm.value.description
      )
      .subscribe(response => {

        if (response.operation == 'error' ) {
          this._baseService.showToast(response.message, 4000);
          this._baseService.endLoading();
        } else if (response.operation == 'success' ) {
          this._baseService.showToast(response.message, 4000);
          setTimeout(() => {
            this._baseService.endLoading();
            this.navCtrl.pop();
          });
        }
      })
    }
  }
}
