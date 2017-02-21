import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { UserProfilePage } from '../pages/userprofile/userprofile';
import { ListPage } from '../pages/list/list';
import { CategoriesPage  } from '../pages/categories/categories';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = ListPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    //public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'User Profile', component: UserProfilePage },
      { title: 'My First List', component: ListPage },
      { title: 'Categories', component: CategoriesPage}
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
    this.nav.push(page.component);
    this.nav.setRoot(page.component);
  }
}
