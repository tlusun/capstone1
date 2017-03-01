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
import {LoginBusinessPage} from '../pages/login-business/login-business';
import {RegisterPage} from '../pages/register/register';
import {RegisterBusinessPage} from '../pages/register-business/register-business';
import { BusinessProfilePage } from '../pages/business-profile/business-profile';
import { BusinessOrdersPage } from '../pages/business-orders/business-orders';
import { EditBusinessProfilePage } from '../pages/edit-business-profile/edit-business-profile';
import { EditServicePage } from '../pages/edit-service/edit-service';
import { BusinessPreviewPage } from '../pages/business-preview/business-preview'

import { AuthService } from '../providers/auth-service';
import { ShareService } from '../providers/share-service';

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
    RegisterBusinessPage,
    LoginPage,
    LoginBusinessPage,
    BusinessProfilePage,
    BusinessOrdersPage,
    EditBusinessProfilePage,
    EditServicePage,
    BusinessPreviewPage
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
    RegisterBusinessPage,
    LoginPage,
    LoginBusinessPage,
    BusinessProfilePage,
    BusinessOrdersPage,
    EditBusinessProfilePage,
    EditServicePage,
    BusinessPreviewPage
  ],
  providers: [AuthService, ShareService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
