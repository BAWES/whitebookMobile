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

import { Category } from '../providers/category';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;

  pages: any;
  personal: Array<{title: string, component: any,icon: any}>;
  events: any[];

  constructor(
    public platform: Platform,
    public menu : MenuController,
    public modalCtnl : ModalController,
    public _categoryService : Category

  ) {
    this.initializeApp();
    
    
    // used for an example of ngFor and navigation
    this.loadPages();    
    
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
    this.nav.push(ListingPage,{title:page.category_name,id:page.category_id});
  }
  
  openUserPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menu.close();
    this.nav.push(page.component);
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

  // Loading category from api
  loadPages(){
    this._categoryService.load()
    .then(data => {
      this.pages = data;
    });
  }

}
