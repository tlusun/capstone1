import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { HomePage  } from '../pages/homepage/homepage';
import {CategoriesPage} from "../pages/categories/categories";
import {UserProfilePage} from "../pages/userprofile/userprofile";
import {RequestServicePage} from "../pages/requestservice/requestservice";
import { UserOrdersPage } from "../pages/userorders/userorders"
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';

import { AuthService } from '../providers/auth-service';

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    HomePage,
    CategoriesPage,
    UserProfilePage,
    RequestServicePage,
    UserOrdersPage,
    RegisterPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    HomePage,
    CategoriesPage,
    UserProfilePage,
    RequestServicePage,
    UserOrdersPage,
    RegisterPage,
    LoginPage
  ],
  providers: [AuthService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
