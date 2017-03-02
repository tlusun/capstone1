import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../homepage/homepage';
import {AlertController} from 'ionic-angular';
import { GetOrdersForCustomer } from '../../providers/get-orders-for-customer';
import { ReviewsService } from '../../providers/reviews-service'
import {PayPal, PayPalPayment, PayPalConfiguration} from "ionic-native";


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private getOrdersForCustomer: GetOrdersForCustomer, private reviewServ: ReviewsService, public alertCtrl: AlertController) {
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

  //TODO: USE PAYPAL SHIT
  pay(){
    PayPal.init({
      "PayPalEnvironmentProduction": "AQk9xIcK4gpfp7Mrrep1CJrfevLihYp9qL5HIa0DQr5IevhtShqHfDZF0ocZpZfDO4zuW_MBuad8oNjL",
      "PayPalEnvironmentSandbox": "AbLZgpHTjmCEhKWk3wXqxoRPxvXv_cJa61zo1zVimz9Wfy7hMjRS-PeyB0dR1nuvKb4IlirMimtqT7Uc"
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      PayPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('3.33', 'CAD', 'Description', 'sale');
        PayPal.renderSinglePaymentUI(payment).then(response => {
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
          console.log("response from Paypal: ", response);
        }, renderError => {
          // Error or render dialog closed without being successful
          console.log("Oops. renderError activated: ", renderError);
        });
      }, configError => {
        // Error in configuration
          console.log("Oops. configError activated: ", configError);
      });
    }, initilizationError => {
      // Error in initialization, maybe PayPal isn't supported or something else
      console.log("Oops. initilizationError activated: ", initilizationError);
    });

  }
  review(order){

    let prompt = this.alertCtrl.create({
      title: 'Edit',
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
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
