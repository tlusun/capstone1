import { Component } from '@angular/core';
import {ListPage} from "../list/list";
import { NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../homepage/homepage';

/*
  Generated class for the Categories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  services: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.services = ['Plumbing','Indoor Renovations','Painting','Other','Garden'];

  }


  openPage(){

    this.navCtrl.push(ListPage);

  }
}
