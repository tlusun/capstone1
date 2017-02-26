import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { HomePage  } from '../pages/homepage/homepage';
import {CategoriesPage} from "../pages/categories/categories";
import {UserProfilePage} from "../pages/userprofile/userprofile";
import {RegisterPage} from '../pages/register/register';
import {LoginPage} from '../pages/login/login';

import { AuthService } from '../providers/auth-service';

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    HomePage,
    CategoriesPage,
    UserProfilePage,
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
    RegisterPage,
    LoginPage
  ],
  providers: [AuthService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
