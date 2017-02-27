import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the BusinessOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-business-orders',
  templateUrl: 'business-orders.html'
})
export class BusinessOrdersPage {
  company: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company = navParams.get('item');
  }

back(){

    this.navCtrl.pop();
}

  changeStatus(){

  }

  messageUser(){

  }
}
