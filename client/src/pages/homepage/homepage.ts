import { Component } from '@angular/core';
import { UserProfilePage } from '../userprofile/userprofile';
import { ListPage } from '../list/list';
import { CategoriesPage  } from '../categories/categories';
import { RequestServicePage } from '../requestservice/requestservice'
import { Platform, MenuController, Nav } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

import {LoginPage} from '../login/login';
import {RegisterPage} from '../register/register';
import { BusinessProfilePage} from '../business-profile/business-profile';
import {BusinessPreviewPage} from '../business-preview/business-preview';

import { ShareService } from '../../providers/share-service';
import { UserProfileService } from '../../providers/user-profile-service'
/*
  Generated class for the Homepage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

export class User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  number: string;
  address: string;

  constructor(email: string, password: string, firstName: string, lastName: string, number: string, address: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
    this.address = address;
  };
}


@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html'
})
export class HomePage {
  searchQuery: string = '';
  items: string[];
  pages: Array<{title: string, component: any}>
  loginCredentials: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shareService: ShareService, private userProfileService: UserProfileService) {

    // set our app's pages
    this.pages = [
      { title: 'User Profile', component: UserProfilePage },
      { title: 'Services List', component: ListPage },
      { title: 'Categories', component: CategoriesPage},
      { title: 'Business Profile', component: BusinessProfilePage},
      { title: 'Log In', component: LoginPage},
      { title: 'Register', component: RegisterPage},
      { title: 'Business Preview', component: BusinessPreviewPage}
    ];

    this.loginCredentials=this.shareService.getCredentials();
    console.log("HOMEPAGE");
    this.userProfileService.getUser(this.loginCredentials).then(
      data => {
        this.user = data;
        console.log("user2: ", this.user);
      }
    );
    console.log("user1: ", this.user);
  }

  openPage(page) {

    // navigate to the new page if it is not the current page
    //this.nav.push(page.component);
    console.log('user in openPage(page): ', this.user);
    this.navCtrl.setRoot(page.component, {
      user: this.user
    });
  }


}
