import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, Platform, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Home } from '../pages/home/home';
import { ListingPage } from '../pages/listing/listing';
import { SearchItemPage } from '../pages/search-item/search-item'
import { LoginPage } from '../pages/user/login/login';
import { MyEventsPage } from '../pages/events/my-events/my-events';

import { MyOrdersPage } from '../pages/account/my-orders/my-orders';
import { MyAddressBookPage }  from  '../pages/account/my-address-book/my-address-book';
import { MyAccountPage }  from  '../pages/account/my-account/my-account';
import { MyWishListPage } from '../pages/account/my-wish-list/my-wish-list';

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
    public menu : MenuController,
    public modalCtnl : ModalController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Venues', component: ListingPage, icon : "venus-icon",id:2 },
      { title: 'Invitations', component: ListingPage , icon : "invitation-icon",id:3 },
      { title: 'Food & Beverage', component: ListingPage , icon : "food-icon" ,id:4},
      { title: 'Decor', component: ListingPage , icon : "decor-icon",id:5 },
      { title: 'Supplies', component: ListingPage , icon : "supplies-icon" ,id:6},
      { title: 'Entertainment', component: ListingPage , icon : "entertainment-icon" ,id:7},
      { title: 'Services', component: ListingPage , icon : "service-icon" ,id:8},
      { title: 'Other', component: ListingPage , icon : "other-icon" ,id:9},
      { title: 'Gift Favors', component: ListingPage , icon : "gift-favor-icon" ,id:10}

    ];
    
    this.personal = [ 
      { title : 'Sign In', component:LoginPage,icon:'sign-in' },
      { title : 'My Orders', component:MyOrdersPage,icon:'archive' },
      { title : 'My Account', component:MyAccountPage,icon: 'user-circle'},
      { title : 'My Events', component:MyEventsPage,icon:'calendar-check-o' },
      { title : 'My Wistlist', component:MyWishListPage,icon:'heart' },
      { title : 'Address Book', component:MyAddressBookPage,icon:'address-book' },
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
    this.menu.close();
    this.nav.push(page.component,{title:page.title});
  }

  openSearchModel() {
    this.menu.close();
    let modal = this.modalCtnl.create(SearchItemPage);
    modal.present();
  }

  openEvents() {
      this.menu.close();
      this.nav.push(MyEventsPage);
      this.menu.close();
  }
}
