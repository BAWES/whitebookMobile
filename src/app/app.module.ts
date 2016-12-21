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

@NgModule({
  declarations: [
    MyApp,
    Home,
    ListingPage,
    ProductPage,
    LoginPage,
    ForgotPasswordPage,
    CheckoutCartPage,
    SearchItemPage
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
    SearchItemPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
