import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, Platform, AlertController, PopoverController, ModalController,Events } from 'ionic-angular';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateService } from '@ngx-translate/core';

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
import { NoInternet } from '../pages/no-internet/no-internet';

// packages Page
import { PackageListPage } from '../pages/packages/package-list/package-list';

import { CommunityListPage } from '../pages/community/community-list/community-list';

// providers
import { HttpService } from '../providers/http.service';
import { Authentication } from '../providers/auth.service'; 
import { CartService } from '../providers/cart.service';

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
  public personalPages: Array<{title: string, component: any, icon: any, slug: string}>;
  public generalPages: Array<{title: string, component: any, icon: any, slug: string}>;
  public legalPages: Array<{title: string, component: any, icon: any, slug: string}>;
  public events: any;

  public menuSide: string = 'left';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menu : MenuController,
    public modalCtnl : ModalController,
    public httpService: HttpService,
    public authService: Authentication,
    public cartService: CartService,
    public translateService: TranslateService,
    private _events: Events,
    private alertCtrl: AlertController,
    public popoverCtrl: PopoverController
  ) {
    this.initializeApp();
    
    this._events.subscribe('internet:offline', TokenSet => {
        this.nav.push(NoInternet);
        ///let popover = this.popoverCtrl.create(NoInternet);
        //popover.present();
    });

    this._events.subscribe('internet:reconnect', params => {
        this.initializeApp();
    });

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

      this.translateService.setDefaultLang('en');
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault(); // Note ionic2 used StatusBar ionic 3 --> statusBar
      this.splashScreen.hide();

      this.loadCategoryList(); // load category listing
      this.isUserLoggedIn  = (this.authService.getAccessToken()) ? true : false;
      this.updateMenu();

      if(this.isUserLoggedIn) {
        this.loadEventList(); // load logged in user event list
      }

      //check cart session id 
      let cartSessionId = window.localStorage.getItem('cart-session-id');
      
      if(!this.isUserLoggedIn && (!cartSessionId || cartSessionId == 'undefined')) {
        this.cartService.getCartSessionId();
      }
    });
  }

  translateToEnglish() {
    this.menu.close().then(result => {
      this.translateService.use('en');
      this.platform.setDir('ltr', true);
      this.menuSide = 'left';    
    });
  }

  translateToArabic(){
    this.menu.close().then(result => {
      this.translateService.use('ar');
      this.platform.setDir('rtl', true);
      this.menuSide = 'right';    
    });
  }
  
  /*
  * Open produdct listing page for perticular category
  */
  openPage(page) {
    this.menu.close();
    this.nav.push(ListingPage, { title: page.category_name, title_ar: page.category_name_ar, id: page.category_id });
  }
  
  /*
  * Open user management page
  */
  openUserPage(page) {
    
    if (page.slug == -1) {
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
      this.nav.push(page.component, { slug: page.slug });
    } else {
      this.nav.push(page.component);
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
    this.httpService.get(this._urlEvent +'?offset='+start).subscribe(events => {
      this.events = events;
    });  
  }

  updateMenu() {
    // Setup the General Pages
    this.generalPages = [
        { title : 'Packages', component:PackageListPage,icon:'archive', slug: null},
        { title : 'Community', component: CommunityListPage, icon:'list', slug: null},
        { title : 'Become a Vendor', component:BecomeVendorPage, icon:'envelope-o', slug: null},
        { title : 'Contact', component:Contact,icon:'wpforms', slug: null},
    ];

    // Legal Pages
    this.legalPages = [
        { title : 'Terms & Conditions', component:Cms,icon:'bookmark-o', slug: 'terms-conditions'},
        { title : 'Privacy Policy', component:Cms,icon:'bookmark-o', slug: 'privacy-policy'},
    ];
    
    // Setup the personal pages
    this.personalPages = [
        { title : 'Track Booking', component:BookingTrackPage, icon:'archive', slug: null},
    ];

    // Add Personal Pages based on Login Status
    if (this.isUserLoggedIn) 
    {
      this.personalPages.push({ title : 'My Bookings', component:MyBookingsPage,icon:'archive', slug: null});
      this.personalPages.push({ title : 'My Account', component:MyAccountPage,icon: 'user-circle', slug: null});
      this.personalPages.push({ title : 'My Wistlist', component:MyWishListPage,icon:'heart', slug: null});
      this.personalPages.push({ title : 'Address Book', component:MyAddressBookPage,icon:'address-book', slug: null});
      this.personalPages.push({ title : 'Logout', component:LoginPage, icon:'power-off', slug: '-1'});
    } 
    else 
    {      
      this.personalPages.push({ title : 'Sign In', component:LoginPage,icon:'sign-in', slug: null});
    }
  }
}
