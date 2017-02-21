import { Component } from '@angular/core';
import {ListPage} from "../list/list";
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Homepage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html'
})
export class HomePage {
  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


}
