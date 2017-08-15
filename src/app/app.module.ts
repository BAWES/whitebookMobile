import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule, Http } from '@angular/http';
import { TranslateService, TranslatePipe, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// Ionic Native
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { NativeStorage } from '@ionic-native/native-storage';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';

// App Imports
import { MyApp } from './app.component';

/**
 * Modules
 */
import { EnvironmentsModule } from './environments/environments.module';
import { SelectSearchModule } from '../components/select-search/select-search.module';

// Start Pages
import { Home } from '../pages/home/home';
import { LoginPage } from '../pages/user/login/login';
import { RegisterPage } from '../pages/user/register/register';
import { ForgotPasswordPage } from '../pages/user/forgot-password/forgot-password';

import { CheckoutShippingPage } from '../pages/checkout/checkout-shipping/checkout-shipping';
import { CheckoutShippingGuestPage } from '../pages/checkout/checkout-shipping-guest/checkout-shipping-guest';
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
import { ProductVideoPage } from '../pages/product-video/product-video';
import { BecomeVendorPage } from '../pages/become-vendor/become-vendor';

// Community
import { CommunityListPage } from '../pages/community/community-list/community-list';
import { CommunityViewPage } from '../pages/community/community-view/community-view';
import { VendorReviewPage } from '../pages/community/vendor-review/vendor-review';

// packages Page
import { PackageListPage } from '../pages/packages/package-list/package-list';
import { PackageDetailPage } from '../pages/packages/package-detail/package-detail';
import { Cms } from '../pages/cms/cms';
import { Contact } from '../pages/contact/contact';
import { NoInternet } from '../pages/no-internet/no-internet';

// services/providers
import { GlobalService } from '../providers/global.service';
import { Authentication } from '../providers/auth.service';
import { Base } from '../providers/base';
import { HttpService } from '../providers/http.service';
import { VendorService } from '../providers/vendor.service';
import { CheckoutService } from '../providers/checkout.service';
import { CartService } from '../providers/cart.service';
import { AddressService } from '../providers/address.service';
import { CmsService } from '../providers/cms.service';
import { ProductService } from '../providers/product.service';
import { BookingService } from '../providers/booking.service';
import { AccountService } from '../providers/logged-in/account.service';
import { WishlistService } from '../providers/logged-in/wishlist.service';

// custom pipe
import { StringFilterPipe } from "./../pipes/string.filter.pipe";

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,
    Home,
    ListingPage,
    ProductPage,
    ProductImagePage,
    ProductVideoPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    CheckoutCartPage,
    SearchItemPage,
    CheckoutShippingPage,
    CheckoutShippingGuestPage,
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
    //TranslatePipe,
    PackageListPage,
    PackageDetailPage,
    BecomeVendorPage,
    NoInternet,
    Cms,
    Contact,
    CommunityListPage,
    CommunityViewPage,
    VendorReviewPage
  ],
  imports: [
    BrowserModule,
    LazyLoadImageModule, 
    HttpModule,
    IonicModule.forRoot(MyApp),    
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }), 
    // Custom Modules
    EnvironmentsModule,
    SelectSearchModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    ListingPage,
    ProductPage,
    ProductImagePage,
    ProductVideoPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    CheckoutCartPage,
    SearchItemPage,
    CheckoutShippingPage,
    CheckoutShippingGuestPage,
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
    NoInternet,
    Cms,
    Contact,
    CommunityListPage,
    CommunityViewPage,
    VendorReviewPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
        provide: TranslateLoader, 
        useFactory: (createTranslateLoader),
        deps: [Http]
    },
    TranslateService,
    SocialSharing,
    GlobalService,
    Authentication,
    IonicStorageModule,
    InAppBrowser,
    GooglePlus,
    Base,
    SplashScreen,
    StatusBar,
    NativeStorage,
    YoutubeVideoPlayer,
    HttpService,
    VendorService,
    CheckoutService,
    CartService,
    AddressService,
    ProductService,
    BookingService,
    AccountService,
    WishlistService,
    Facebook
  ],
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}