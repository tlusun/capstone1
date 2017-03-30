import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage} from '../homepage/homepage';
import {AlertController} from 'ionic-angular';
import { GetOrdersForCustomer } from '../../providers/get-orders-for-customer';
import { ReviewsService } from '../../providers/reviews-service'
import {PayPal, PayPalPayment, PayPalConfiguration} from "ionic-native";
import { UpdateInvoice } from '../../providers/update-invoice';
import { BusinessProfileService } from '../../providers/business-profile-service';
import { StripePayPage } from '../stripe-pay/stripe-pay';
import {UpdateCompanyProfile} from '../../providers/update-company-profile';
import {MessagesPage} from '../messages/messages';

import { ModalController } from 'ionic-regular';

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
  reviews:any;
  newreview: any;
  rating: any;
  company: any;


  getOrders(user){
    this.orders = [];
    this.getOrdersForCustomer.getOrdersForCustomer(this.user).then(
      data => {
        this.orders = data;
        console.log("this.orders: ", this.orders);
        //this.initializeItems(this.selectedItem);
      }
    );
    this.newreview=[];
    console.log('this.orders in userorders.ts', this.orders);
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter() has been called!");
    console.log("this.user before: ", this.user);
    this.getOrders(this.user);
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave() has been called!");
    console.log("this.user after: ", this.user);
  }

  constructor(public navCtrl: NavController, private updateCompany:UpdateCompanyProfile, private getBusiness: BusinessProfileService, public navParams: NavParams, public toastCtrl: ToastController, private getOrdersForCustomer: GetOrdersForCustomer, private reviewServ: ReviewsService, public alertCtrl: AlertController, private updateInvoiceService: UpdateInvoice) {
    this.user = navParams.get('item');
    console.log("this.user: ", this.user);
    this.getOrders(this.user);

    ////
    //this.user = navParams.get('item');
    //this.orders = this.user.orderhistory;

  }

  back(){
    this.navCtrl.pop();
  }

  pay(order){
    console.log("going to stripe pay page!");
    //go to payment page with param "order"
    this.navCtrl.push(StripePayPage, {
      order: order,
      user: this.user
    });
  }

  review(order){
    var companyCredentials = {
      email: order.businessEmail
    };
    let prompt = this.alertCtrl.create({
      title: 'Review',
      message: "Write a new review. and choose a rating " ,
      inputs: [
        {
          name: 'review',
          placeholder: 'Type Review Here',

        },
        {
          name: 'rating',
          placeholder: 'Enter rating from 1-10',
          type: 'number'
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
            if (data.review != "" && data.rating >=0 && data.rating<=10) {
              this.newreview = {
                companyEmail : order.businessEmail,
                customerEmail : this.user.email,
                rating : data.rating,
                review : data.review,
              };
              //TODO: ADD SERVICE HERE
              this.reviewServ.createReview(this.newreview);
              this.updateInvoiceService.updateInvoiceStatus(order._id,"Complete-Reviewed").then(
                data=>{
                  this.getOrders(this.user);
                  this.reviewServ.getReviews(companyCredentials).then(
                    data => {
                      this.reviews = data;
                      this.rating =0;

                      for (var i =0; i<this.reviews.length; i++){
                        this.rating += this.reviews[i].rating;
                      }
                      if (this.reviews.length==0)
                        this.rating="No ratings yet";
                      else {
                        this.rating = this.rating / this.reviews.length;
                        parseFloat(this.rating).toFixed(1);
                      }

                    this.getBusiness.getBusiness(companyCredentials).then(
                      data =>{
                        this.company=data;
                        this.company.rating=this.rating;
                        this.updateCompany.updateCompanyRating(this.company._id,this.rating).then(
                          data => {
                            //this.initializeItems(this.selectedItem);
                          });
                      }
                    )

                    }
                  );
                }
              );
              let toast = this.toastCtrl.create({
                message: 'Review added! Thank you for your input!',
                duration: 3000
              });
              toast.present();

            }
            else{
              let toast = this.toastCtrl.create({
                message: 'Invalid Input, please try again.',
                duration: 3000
              });
              toast.present();
            }
          }
        }
      ]
    });
    this.getOrders(this.user);
    prompt.present();

  }


  message(order){
this.navCtrl.push(MessagesPage,{
  order: order,
  user: this.user
})


  }

}
