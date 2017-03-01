import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../homepage/homepage';


/*
  Generated class for the Userorders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userorders',
  templateUrl: 'userorders.html'
})
export class UserOrdersPage {
  user : any;
  orders : Object;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.user = navParams.get('item');
    this.orders = this.user.orderhistory;

  }

  back(){
    this.navCtrl.pop();
  }

  requestcancel(){


  }

}
