import { Injectable } from '@angular/core';
import { ToastController ,AlertController,LoadingController, Loading} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class Base {
  private loading: Loading;
  constructor(
    private toastCtrl : ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private _storageService: Storage
  ){}

  startLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  endLoading(){
    this.loading.dismiss();
  }

  showToast(text:string, duration:number = 2000) {
    let toast = this.toastCtrl.create({
          message: text,
          duration: duration
      });
      toast.present();
  }
  
  showAlertWithOkBtn(title:string, text:string, BtnText:string = 'OK') {
      setTimeout(() => {
        this.loading.dismiss();
      });
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [BtnText]
      });
      alert.present(prompt);
    }
}
