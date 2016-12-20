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
  personal: Array<{title: string, component: any,icon: any}>;
  events: any[];

  constructor(
    public platform: Platform,
    public menu : MenuController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home, icon : "home" ,id:1},
      { title: 'Venues', component: ListingPage, icon : "map-marker",id:2 },
      { title: 'Invitations', component: ListingPage , icon : "envelope-open-o",id:3 },
      { title: 'Food & Beverage', component: ListingPage , icon : "cutlery" ,id:4},
      { title: 'Decor', component: ListingPage , icon : "building",id:5 },
      { title: 'Supplies', component: ListingPage , icon : "truck" ,id:6},
      { title: 'Entertainment', component: ListingPage , icon : "headphones" ,id:7},
      { title: 'Services', component: ListingPage , icon : "cogs" ,id:8},
      { title: 'Other', component: ListingPage , icon : "cubes" ,id:9},
      { title: 'Gift Favors', component: ListingPage , icon : "gift" ,id:10}
    ];
    
    this.personal = [ 
      { title : 'Sign In', component:Home,icon:'sign-in' },
      { title : 'My Orders', component:Home,icon:'archive' },
      { title : 'My Account', component:Home,icon: 'user-circle'},
      { title : 'My Events', component:Home,icon:'calendar-check-o' },
      { title : 'Address Book', component:Home,icon:'address-book' },
      { title : 'Logout', component:Home ,icon:'power-off'},
    ]

    this.events = [ 
      { title : 'Event1' },
      { title : 'Event2' },
      { title : 'Event3' },
    ]
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
