import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { NativeStorage } from '@ionic-native/native-storage';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';

import { LoginPage } from '../pages/user/login/login';
import { RegisterPage } from '../pages/user/register/register';
import { ForgotPasswordPage } from '../pages/user/forgot-password/forgot-password';

import { CheckoutShippingPage } from '../pages/checkout/checkout-shipping/checkout-shipping';
import { CheckoutCompletedPage } from '../pages/checkout/checkout-completed/checkout-completed';
import { CheckoutCartPage } from '../pages/checkout/checkout-cart/checkout-cart';
import { CheckoutConfirmPage } from '../pages/checkout/checkout-confirm/checkout-confirm';

import { MyEventsPage } from  '../pages/events/my-events/my-events';
import { CreateEventPage } from '../pages/events/create-event/create-event';

import { MyAddressBookPage }  from  '../pages/account/my-address-book/my-address-book';
import { MyAccountPage }  from  '../pages/account/my-account/my-account';
import { MyBookingsPage } from  '../pages/account/my-bookings/my-bookings';
import { BookingDetailPage } from '../pages/account/booking-detail/booking-detail';
import { BookingTrackPage } from '../pages/account/booking-track/booking-track';
import { MyWishListPage } from '../pages/account/my-wish-list/my-wish-list';
import { CreateAddressPage } from '../pages/account/create-address/create-address';

import { SearchFilterPage } from '../pages/search-filter/search-filter';
import { SearchItemPage } from '../pages/search-item/search-item';
import { ListingPage } from '../pages/listing/listing';
import { ProductPage } from '../pages/product/product';
import { ProductImagePage } from '../pages/product-image/product-image';
import { BecomeVendorPage } from '../pages/become-vendor/become-vendor';
 
// Directory 
import { DirectoryListPage } from '../pages/directory/directory-list/directory-list';
import { DirectoryViewPage } from '../pages/directory/directory-view/directory-view';

// packages Page
import { PackageListPage } from '../pages/packages/package-list/package-list';
import { PackageDetailPage } from '../pages/packages/package-detail/package-detail';
import { Cms } from '../pages/cms/cms';
import { Contact } from '../pages/contact/contact';

// services/providers
import { GlobalService } from '../providers/global.service';
import { Authentication } from '../providers/auth.service';
import { Base } from '../providers/base';
import { HttpService } from '../providers/http.service';
import { CartCountService } from '../providers/cart.count.service';
import { VendorService } from '../providers/vendor.service';
import { CheckoutService } from '../providers/checkout.service';
import { CartService } from '../providers/cart.service';
import { AddressService } from '../providers/address.service';

// custom pipe
import { StringFilterPipe } from "./../pipes/string.filter.pipe";

import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    Home,
    ListingPage,
    ProductPage,
    ProductImagePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    CheckoutCartPage,
    SearchItemPage,
    CheckoutShippingPage,
    CheckoutCompletedPage,
    CheckoutConfirmPage,
    MyBookingsPage,
    BookingTrackPage,
    MyEventsPage,
    MyAddressBookPage,
    MyAccountPage,
    BookingDetailPage,
    MyWishListPage,
    CreateAddressPage,
    CreateEventPage,
    SearchFilterPage,
    StringFilterPipe,
    PackageListPage,
    PackageDetailPage,
    BecomeVendorPage,
    Cms,
    Contact,
    DirectoryListPage,
    DirectoryViewPage
  ],
  imports: [
    BrowserModule,  // New in ionic 3
    HttpModule,  // New in ionic 3
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    ListingPage,
    ProductPage,
    ProductImagePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    CheckoutCartPage,
    SearchItemPage,
    CheckoutShippingPage,
    CheckoutCompletedPage,
    CheckoutConfirmPage,
    MyBookingsPage,
    BookingTrackPage,
    MyEventsPage,
    MyAddressBookPage,
    MyAccountPage,
    BookingDetailPage,
    MyWishListPage,
    CreateAddressPage,
    CreateEventPage,
    SearchFilterPage,
    PackageListPage,
    PackageDetailPage,
    BecomeVendorPage,
    Cms,
    Contact,
    DirectoryListPage,
    DirectoryViewPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalService,
    Authentication,
    IonicStorageModule,
    InAppBrowser,
    Base,
    SplashScreen, // Newly add for ionic 3
    StatusBar,
    NativeStorage,
    HttpService,
    CartCountService,
    VendorService,
    CheckoutService,
    CartService,
    AddressService
    ],
})
export class AppModule {}

