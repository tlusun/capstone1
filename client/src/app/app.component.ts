import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { UserProfilePage } from '../pages/userprofile/userprofile';
import { ListPage } from '../pages/list/list';
import { CategoriesPage  } from '../pages/categories/categories';
import { RequestServicePage } from '../pages/requestservice/requestservice';
import { BusinessProfilePage } from '../pages/business-profile/business-profile';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'User Profile', component: UserProfilePage },
      { title: 'Services List', component: ListPage },
      { title: 'Categories', component: CategoriesPage},
      { title: 'Log In', component: LoginPage},
      { title: 'Register', component: RegisterPage},
      { title: 'Business Profile', component: BusinessProfilePage}

    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    //this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.push(page.component);
    this.nav.setRoot(page.component);
  }
}
