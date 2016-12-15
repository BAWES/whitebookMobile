import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Home } from '../pages/home/home';
import { ListingPage } from '../pages/listing/listing';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;

  pages: Array<{title: string, component: any, icon: any,id:number}>;

  constructor(
    public platform: Platform,
    public menu : MenuController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home, icon : "venus_icon" ,id:1},
      { title: 'Venues', component: ListingPage, icon : "venus_icon",id:2 },
      { title: 'Invitations', component: ListingPage , icon : "invit_icon",id:3 },
      { title: 'Food & Beverage', component: ListingPage , icon : "food_map" ,id:4},
      { title: 'Decor', component: ListingPage , icon : "decor",id:5 },
      { title: 'Supplies', component: ListingPage , icon : "supplies" ,id:6},
      { title: 'Entertainment', component: ListingPage , icon : "entert" ,id:7},
      { title: 'Services', component: ListingPage , icon : "serv" ,id:8},
      { title: 'Other', component: ListingPage , icon : "other" ,id:9},
      { title: 'Gift Favors', component: ListingPage , icon : "say_thank" ,id:10}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page);
    this.menu.close();
    this.nav.push(page.component,{category:page});
  }
}
