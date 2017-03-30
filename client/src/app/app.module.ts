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
import { StripePayPage } from '../pages/stripe-pay/stripe-pay'

import { AuthService } from '../providers/auth-service';
import { ShareService } from '../providers/share-service';
import { UserProfileService } from '../providers/user-profile-service'
import { GetCompanies } from '../providers/get-companies'
import { GetOrdersForCustomer } from '../providers/get-orders-for-customer'
import { GetOrdersForBusiness } from '../providers/get-orders-for-business'

import { RequestService } from '../providers/request-service'
import {BusinessProfileService} from "../providers/business-profile-service";
import { UpdateInvoice } from '../providers/update-invoice'
import { ReviewsService } from '../providers/reviews-service'
import { UpdateCompanyServices } from'../providers/update-company-services';
import { UpdateCompanyProfile } from'../providers/update-company-profile';
import {EditUserProfilePage} from '../pages/edit-user-profile/edit-user-profile';
import {UpdateUserProfile} from '../providers/update-user-profile';
import {SearchByLocation} from '../providers/search-by-location';
<<<<<<< HEAD
import {MessagesPage} from '../pages/messages/messages';
=======
import {StripeCharge} from '../providers/stripe-charge'

>>>>>>> ee8af41db5dd715f4443152502387eb65c520f1d

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
    BusinessPreviewPage,
    EditUserProfilePage,
    StripePayPage,
    MessagesPage
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
    BusinessPreviewPage,
    EditUserProfilePage,
    StripePayPage,
    MessagesPage
  ],
  providers: [
    AuthService,
    ShareService,
    UserProfileService,
    GetCompanies,
    GetOrdersForCustomer,
    GetOrdersForBusiness,
    RequestService,
    BusinessProfileService,
    UpdateInvoice,
    ReviewsService,
    UpdateCompanyServices,
    UpdateCompanyProfile,
    UpdateUserProfile,
    SearchByLocation,
    StripeCharge,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
