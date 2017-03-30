import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { GetOrdersForBusiness } from '../../providers/get-orders-for-business';
import { UpdateInvoice } from '../../providers/update-invoice';
import { MessagesCompanyPage} from '../messages-company/messages-company';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private getOrdersForBusiness: GetOrdersForBusiness, private updateInvoiceService: UpdateInvoice) {
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
        console.log("HOLY SHIT THIS ORDER: ", order._id);
        //console.log("wtf is data in business-orders: ", data);
        //TODO: CALL SERVICE TO UPDATE STATUS OF ORDER, pass order._id, as well as order.status
        this.updateInvoiceService.updateInvoiceStatus(order._id, order.status).then(
          data => {
            //TODO: WHAT SHOULD BE HERE?
            //data returns as true or false, depending on success 
          }
        );
      }
    });
    alert.present();
  }

  message(order){
   this.navCtrl.push(MessagesCompanyPage,{
     order:order,
     user:this.company
   })
  }
}
