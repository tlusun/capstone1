import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UpdateInvoice } from '../../providers/update-invoice';
/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
user:any;
order:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.user = navParams.get('user');
    this.order = navParams.get('order');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

}
