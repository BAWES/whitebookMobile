import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, Platform, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// pages
import { Home } from '../pages/home/home';
import { ListingPage } from '../pages/listing/listing';
import { SearchItemPage } from '../pages/search-item/search-item'
import { LoginPage } from '../pages/user/login/login';
import { MyEventsPage } from '../pages/events/my-events/my-events';
import { MyOrdersPage } from '../pages/account/my-orders/my-orders';
import { MyAddressBookPage }  from  '../pages/account/my-address-book/my-address-book';
import { MyAccountPage }  from  '../pages/account/my-account/my-account';
import { MyWishListPage } from '../pages/account/my-wish-list/my-wish-list';

// providers
import { HttpService } from '../providers/http.service';
import { Authentication } from '../providers/auth.service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;
  public isUserLoggedIn:boolean;
  // api urls
  public _urlEvent: string = "/event";
  public _urlCategory: string = "/category";

  //local variables
  public categoryList: any;
  public personal: Array<{title: string, component: any,icon: any}>;
  public events: any;

  constructor(
    public platform: Platform,
    public menu : MenuController,
    public modalCtnl : ModalController,
    public httpService: HttpService,
    public authService: Authentication

  ) {
    this.initializeApp();
    this.loadEventList(); // load logged in user event list
    this.loadCategoryList(); // load category listing
    
    if (this.authService.getAccessToken()) {
      this.personal = [
        { title : 'My Orders', component:MyOrdersPage,icon:'archive' },
        { title : 'My Account', component:MyAccountPage,icon: 'user-circle'},
        { title : 'My Events', component:MyEventsPage,icon:'calendar-check-o' },
        { title : 'My Wistlist', component:MyWishListPage,icon:'heart' },
        { title : 'Address Book', component:MyAddressBookPage,icon:'address-book' },
        { title : 'Logout', component:Home ,icon:'power-off'},
      ]
    } else {
      this.personal = [
        { title : 'Sign In', component:LoginPage,icon:'sign-in' },
      ]
    }
    this.isUserLoggedIn = this.authService.getAccessToken();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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
    this.menu.close();
    this.nav.push(page.component);
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
}
