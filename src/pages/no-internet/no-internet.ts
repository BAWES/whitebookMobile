import { Component } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { Events } from 'ionic-angular';
//Pages
import { Home } from '../home/home';

@Component({
  selector: 'page-no-internet',
  templateUrl: 'no-internet.html',
})
export class NoInternet {

  constructor(
    public events: Events, 
    public navCtrl: NavController
  ) { }

  refresh() {
    this.events.publish('internet:reconnect');
    this.navCtrl.setRoot(Home);
  }
}

