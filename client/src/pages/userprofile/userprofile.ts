import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserOrdersPage } from "../userorders/userorders";
/*
  Generated class for the Userprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html'
})
export class UserProfilePage {
  orders: Array<{userid: number, ordername: String, companyid: number, invoice: String, cost: number, status: String, date: String}>;

  user: {username: String, userid: number, fullname: String, address: String, phone: number, email: String, orderhistory: Object};


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orders = [];
    for(let i = 1; i < 15; i++) {

      this.orders.push({
        userid: 1,
        ordername: 'Order New Toilet #' + i,
        companyid: i,
        invoice: "New toilet: 500, Installation Labour: 500",
        cost: 1000,
        status: "Pending",
        date: "Nov 15 2017"
        });
    }

    this.user = {
      username: 'tlusun',
      userid: 1,
      fullname: 'Tommy Lusun',
      address: '315 Wharncliffe Rd',
      phone: 4164164161,
      email: 'tlusun@uwo.ca',
      orderhistory: this.orders

    }

  }

  openPage(){

    this.navCtrl.push(UserOrdersPage, {
      item: this.user
    });
  }
}
