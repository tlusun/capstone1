import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../homepage/homepage';
import {AlertController} from 'ionic-angular';
import { GetOrdersForCustomer } from '../../providers/get-orders-for-customer';
import { ReviewsService } from '../../providers/reviews-service'
import {PayPal, PayPalPayment, PayPalConfiguration} from "ionic-native";
import { UpdateInvoice } from '../../providers/update-invoice';


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

  newreview: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private getOrdersForCustomer: GetOrdersForCustomer, private reviewServ: ReviewsService, public alertCtrl: AlertController, private updateInvoiceService: UpdateInvoice) {
    this.user = navParams.get('item');
    console.log("this.user: ", this.user);
    this.getOrdersForCustomer.getOrdersForCustomer(this.user).then(
      data => {
        this.orders = data;
        console.log("this.orders: ", this.orders);
        //this.initializeItems(this.selectedItem);
      }
    );
    this.newreview=[];
    console.log('this.orders in userorders.ts', this.orders);

    ////
    //this.user = navParams.get('item');
    //this.orders = this.user.orderhistory;

  }

  back(){
    this.navCtrl.pop();
  }

  //TODO: use stripe
  pay(){
    

  }
  review(order){

    let prompt = this.alertCtrl.create({
      title: 'Review',
      message: "Write a new review. " ,
      inputs: [
        {
          name: 'review',
          placeholder: 'Comment here',

        },
        {
          name: 'rating',
          placeholder: '',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (data !== "") {
              this.newreview = {
                companyEmail : order.businessEmail,
                customerEmail : this.user.email,
                rating : data.rating,
                review : data.review,
              }
              //TODO: ADD SERVICE HERE
              this.reviewServ.createReview(this.newreview);
              this.updateInvoiceService.updateInvoiceStatus(order._id,"Complete-Reviewed").then();

            }
          }
        }
      ]
    });
    prompt.present();
  }

}
