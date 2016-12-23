import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { ListingPage } from '../pages/listing/listing';
import { ProductPage } from '../pages/product/product';
import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { CheckoutCartPage } from '../pages/checkout-cart/checkout-cart';
import { SearchItemPage } from '../pages/search-item/search-item';
import { CheckoutShippingPage } from '../pages/checkout-shipping/checkout-shipping';
import { CheckoutPaymentPage } from '../pages/checkout-payment/checkout-payment';
import { CheckoutCompletedPage } from '../pages/checkout-completed/checkout-completed';
import { MyEventsPage } from  '../pages/my-events/my-events';
import { MyOrdersPage } from  '../pages/my-orders/my-orders';
import { MyAddressBookPage }  from  '../pages/my-address-book/my-address-book';
import { MyAccountPage }  from  '../pages/my-account/my-account';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { MyWishListPage } from '../pages/my-wish-list/my-wish-list';
import { CreateAddressPage } from '../pages/create-address/create-address';
@NgModule({
  declarations: [
    MyApp,
    Home,
    ListingPage,
    ProductPage,
    LoginPage,
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
    CreateAddressPage
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
    CreateAddressPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
