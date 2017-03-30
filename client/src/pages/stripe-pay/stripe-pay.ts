import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';

/*
  Generated class for the StripePay page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stripe-pay',
  templateUrl: 'stripe-pay.html'
})
export class StripePayPage {
  user: any;
  order: Object;

  /**
  * Init
  */
  inputForm = {
    currency: 'USD',
    amountCents: 500,
    date: this.todayFormatted(),   // init
    number: 4242424242424242,      // remove this for production
    name: "Holder name",           // remove this for production
    cvc: 123,                      // remove this for production
  }
  status = {
    message: '',
    loading: false,
    success: null,
  }

  /*
  * Helper functions
  */
  todayFormatted() {
    var d = new Date();
    var m = d.getMonth()+1;
    var y = d.getFullYear();
    if (m < 10) {
      return y + '-0' + m;
    } else {
      return y + '-' + m;
    }
  }


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get('user');
    this.order = navParams.get('order');
    console.log("this.user: ", this.user);
    console.log("this.order: ", this.order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StripePayPage');
  }

}
