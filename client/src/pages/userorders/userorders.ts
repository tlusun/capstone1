import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../homepage/homepage';

import { GetOrdersForCustomer } from '../../providers/get-orders-for-customer';


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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private getOrdersForCustomer: GetOrdersForCustomer) {
    this.user = navParams.get('item');
    console.log("this.user: ", this.user);
    this.getOrdersForCustomer.getOrdersForCustomer(this.user).then(
      data => {
        this.orders = data;
        console.log("this.orders: ", this.orders);
        //this.initializeItems(this.selectedItem);
      }
    );
    console.log('this.orders in userorders.ts', this.orders);

    ////
    //this.user = navParams.get('item');
    //this.orders = this.user.orderhistory;

  }

  back(){
    this.navCtrl.pop();
  }

  pay(){


  }

}
