import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, Platform, ModalController,Events } from 'ionic-angular';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

// pages
import { Home } from '../pages/home/home';
import { ListingPage } from '../pages/listing/listing';
import { SearchItemPage } from '../pages/search-item/search-item'
import { LoginPage } from '../pages/user/login/login';
import { MyEventsPage } from '../pages/events/my-events/my-events';
import { MyBookingsPage } from '../pages/account/my-bookings/my-bookings';
import { MyAddressBookPage }  from  '../pages/account/my-address-book/my-address-book';
import { MyAccountPage }  from  '../pages/account/my-account/my-account';
import { MyWishListPage } from '../pages/account/my-wish-list/my-wish-list';
import { BookingTrackPage } from '../pages/account/booking-track/booking-track';
import { BecomeVendorPage } from '../pages/become-vendor/become-vendor';
import { Cms } from '../pages/cms/cms';
import { Contact } from '../pages/contact/contact';

// packages Page
import { PackageListPage } from '../pages/packages/package-list/package-list';

import { DirectoryListPage } from '../pages/directory/directory-list/directory-list';

// providers
import { HttpService } from '../providers/http.service';
import { Authentication } from '../providers/auth.service'; 

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;
  public isUserLoggedIn:boolean = false;
  public isUserLoggedOut:any;
  // api urls
  public _urlEvent: string = "/event";
  public _urlCategory: string = "/category";
  public _urllogout: string = "/account/logout";
  //local variables
  public categoryList: any;
  public personal: Array<{title: string, component: any,icon: any,login:any,pageID:number}>;
  public events: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menu : MenuController,
    public modalCtnl : ModalController,
    public httpService: HttpService,
    public authService: Authentication,
    private _events: Events,

  ) {
    this.initializeApp();
    this.loadEventList(); // load logged in user event list
    this.loadCategoryList(); // load category listing
    this.isUserLoggedIn  = (this.authService.getAccessToken()) ? true : false;
    this.updateMenu();

    this._events.subscribe('user:login', TokenSet => {
      this.isUserLoggedIn = true;
      this.updateMenu();
   })

    this._events.subscribe('user:logout', reason => {
      this.isUserLoggedIn = false;
      this.updateMenu();
   })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault(); // Note ionic2 used StatusBar ionic 3 --> statusBar
      this.splashScreen.hide();
    });
  }

  /*
  * Open produdct listing page for perticular category
  */
  openPage(page) {
    this.menu.close();
    this.nav.push(ListingPage,{title:page.category_name,id:page.category_id});
  }
  
  /*
  * Open user management page
  */
  openUserPage(page) {
    
    if (page.login == 0) {
        this.httpService.get(this._urllogout).
        subscribe(
          logout => {
            this.isUserLoggedOut = logout;
            if (this.isUserLoggedOut.code == 1) {
              this.authService.logout('Logout Account');
            }
          }
        );  
    }

    this.menu.close();
    
    if (page.component == Cms) {
      this.nav.push(page.component,{id:page.pageID});
    } else {
      this.nav.push(page.component,{id:page.pageID});
    }
  }

  /*
  * Open search modal for product search
  */
  openSearchModel() {
    this.menu.close();
    let modal = this.modalCtnl.create(SearchItemPage);
    modal.present();
  }

  /*
  * Open event listing page
  */
  openEvents() {
      this.menu.close();
      this.nav.push(MyEventsPage);
      this.menu.close();
  }

  /*
  * load category list
  */
  loadCategoryList(start:number = 0){
    this.httpService.get(this._urlCategory +'?offset='+start,false).subscribe(cateries => this.categoryList = cateries);
  }

  /*
  * load event listing
  */
  loadEventList(start: number = 0) {
    if (this.authService.getAccessToken()) {
      this.httpService.get(this._urlEvent +'?offset='+start).subscribe(events => this.events = events);  
    }
  }

  updateMenu() {
     if (this.isUserLoggedIn) {
      this.personal = [
        { title : 'Terms & Condition', component:Cms,icon:'bookmark-o', login:1,pageID:7},
        { title : 'Privacy Policy', component:Cms,icon:'bookmark-o', login:1,pageID:9},
        { title : 'Packages', component:PackageListPage,icon:'archive', login:1,pageID:0},
        { title : 'Contact', component:Contact,icon:'wpforms', login:1,pageID:0},
        { title : 'Track Booking', component:BookingTrackPage, icon:'map-pin', login:1,pageID:0},
        { title : 'My Bookings', component:MyBookingsPage,icon:'archive', login:1,pageID:0},
        { title : 'My Account', component:MyAccountPage,icon: 'user-circle', login:1,pageID:0},
        //{ title : 'My Events', component:MyEventsPage,icon:'calendar-check-o', login:1},
        { title : 'Directory', component: DirectoryListPage, icon:'list', login:0, pageID:0},
        { title : 'My Wistlist', component:MyWishListPage,icon:'heart', login:1,pageID:0},
        { title : 'Address Book', component:MyAddressBookPage,icon:'address-book', login:1,pageID:0},
        { title : 'Become Vendor', component:BecomeVendorPage, icon:'mail-open', login:0,pageID:0},
        { title : 'Logout', component:LoginPage, icon:'power-off', login:0,pageID:0}
      ]
    } else {
      this.personal = [
        { title : 'Directory', component: DirectoryListPage, icon:'list', login:0, pageID:0},
        { title : 'Become Vendor', component:BecomeVendorPage, icon:'mail-open', login:0,pageID:0},
        { title : 'Terms & Condition', component:Cms,icon:'bookmark-o', login:1,pageID:7},
        { title : 'Privacy Policy', component:Cms,icon:'bookmark-o', login:1,pageID:9},
        { title : 'Packages', component:PackageListPage,icon:'archive', login:1,pageID:0},
        { title : 'Sign In', component:LoginPage,icon:'sign-in', login:1,pageID:0},
        { title : 'Track Booking', component:BookingTrackPage, icon:'archive', login:1,pageID:0},
      ]
    }
  }
}
