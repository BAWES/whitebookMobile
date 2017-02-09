import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/user/login/login';
import { RegisterPage } from '../pages/user/register/register';
import { ForgotPasswordPage } from '../pages/user/forgot-password/forgot-password';

import { CheckoutShippingPage } from '../pages/checkout/checkout-shipping/checkout-shipping';
import { CheckoutPaymentPage } from '../pages/checkout/checkout-payment/checkout-payment';
import { CheckoutCompletedPage } from '../pages/checkout/checkout-completed/checkout-completed';
import { CheckoutCartPage } from '../pages/checkout/checkout-cart/checkout-cart';

import { MyEventsPage } from  '../pages/events/my-events/my-events';
import { CreateEventPage } from '../pages/events/create-event/create-event';

import { MyAddressBookPage }  from  '../pages/account/my-address-book/my-address-book';
import { MyAccountPage }  from  '../pages/account/my-account/my-account';
import { MyOrdersPage } from  '../pages/account/my-orders/my-orders';
import { OrderDetailPage } from '../pages/account/order-detail/order-detail';
import { MyWishListPage } from '../pages/account/my-wish-list/my-wish-list';
import { CreateAddressPage } from '../pages/account/create-address/create-address';

import { SearchFilterPage } from '../pages/search-filter/search-filter';
import { SearchItemPage } from '../pages/search-item/search-item';
import { ListingPage } from '../pages/listing/listing';
import { ProductPage } from '../pages/product/product';

// services/providers
import { GlobalService } from '../providers/global.service';
import { Authentication } from '../providers/auth.service';
import { Base } from '../providers/base';
import { HttpService } from '../providers/http.service';

// custom pipe
import { StringFilterPipe } from "./../pipes/string.filter.pipe";

@NgModule({
  declarations: [
    MyApp,
    Home,
    ListingPage,
    ProductPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    CheckoutCartPage,
    SearchItemPage,
    CheckoutShippingPage,
    CheckoutPaymentPage,
    CheckoutCompletedPage,
    MyOrdersPage,
    MyEventsPage,
    MyAddressBookPage,
    MyAccountPage,
    OrderDetailPage,
    MyWishListPage,
    CreateAddressPage,
    CreateEventPage,
    SearchFilterPage,
    StringFilterPipe,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    ListingPage,
    ProductPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    CheckoutCartPage,
    SearchItemPage,
    CheckoutShippingPage,
    CheckoutPaymentPage,
    CheckoutCompletedPage,
    MyOrdersPage,
    MyEventsPage,
    MyAddressBookPage,
    MyAccountPage,
    OrderDetailPage,
    MyWishListPage,
    CreateAddressPage,
    CreateEventPage,
    SearchFilterPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalService,
    Authentication,
    Storage,
    Base,
    HttpService
    ],
})
export class AppModule {}
