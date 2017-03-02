import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { GetOrdersForBusiness } from '../../providers/get-orders-for-business';
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
  orders: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private getOrdersForBusiness: GetOrdersForBusiness) {
    this.company = navParams.get('item');
    console.log("this.company: ", this.company);

    this.getOrdersForBusiness.getOrdersForBusiness(this.company).then(
      data => {
        this.orders = data;
        console.log("this.orders: ", this.orders);
        //this.initializeItems(this.selectedItem);
      }
    );
    console.log('this.orders in userorders.ts', this.orders);
  }

back(){

    this.navCtrl.pop();
}

  changeStatus(order){
    let alert = this.alertCtrl.create();
    alert.setTitle('Order Status');

    alert.addInput({
      type: 'radio',
      label: 'Pending',
      value: 'Pending',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Accepted',
      value: 'Accepted',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Declined',
      value: 'Declined',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Complete-Waiting Payment',
      value: 'Complete-WaitingPayment',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Complete-Paid',
      value: 'Complete-Paid',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        order.status=data;
      }
    });
    alert.present();
  }

  updateInvoice(order){
    let prompt = this.alertCtrl.create({
      title: 'Invoice',
      message: "Make Invoice",
      inputs: [
        {
          name: 'text',
          placeholder: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Save',
          handler: data => {
            order.invoice=data.text;
          }
        }
      ]
    });
    prompt.present();
  }
}
