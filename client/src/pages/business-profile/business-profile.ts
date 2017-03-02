import {Component} from '@angular/core';
import {NavController, NavParams, Loading, LoadingController} from 'ionic-angular';
import {BusinessOrdersPage} from '../business-orders/business-orders';
import {EditBusinessProfilePage} from "../edit-business-profile/edit-business-profile";
import {ShareService} from "../../providers/share-service";
import {BusinessProfileService} from "../../providers/business-profile-service";
import { ReviewsService } from '../../providers/reviews-service'
import {LoginPage} from '../login/login';

/*
 Generated class for the BusinessProfile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-business-profile',
  templateUrl: 'business-profile.html'
})
export class BusinessProfilePage {
  orders: Array<{userid: number, ordernumber: number, ordername: String, companyid: number, invoice: String, cost: number, status: String, date: String}>;
  services: Array<{service: String, details: String, price: any}>;
  reviews: any;
  company: {username: String, companyid: number, companyname: String, services: any, description: String, address: String, phone: number, email: String, orders: Object, reviews: any, notifications: any};
  notifications: Array<{title: String, description: String, time: any}>;
  company1: any;
  registerCredentials: any;
  loading: Loading;


  constructor(public navCtrl: NavController, public navParams: NavParams, private shareService: ShareService, private businessProfileService: BusinessProfileService, private loadCtl: LoadingController, private reviewServ : ReviewsService) {
    this.registerCredentials=this.navParams.get('registerCredentials');
      this.shareService.setCredentials(this.registerCredentials);


      this.businessProfileService.getBusiness(this.registerCredentials).then(
        data => {
              this.company1 = data;
              console.log("businessprf: ", this.company1);
            }
          );

      console.log("businessprof2: ", this.company1);

      this.reviewServ.getReviews(this.registerCredentials).then(
        data => {
            this.reviews = data; 
        }
      );



    this.services=[];
    this.reviews=[];
    this.orders=[];
    this.notifications=[];

    for (let j = 1; j < 4; j++) {
      this.services.push({
        service: 'Service #' + j,
        details: 'This is the best service. proabably not, cuz this is actually the worst service',
        price: j * 1500
      });
    }
    for (let j = 1; j < 4; j++) {
      this.reviews.push({
        companyid: 1,
        username: 'user #' + j,
        comment: 'this company sucks big time, if i had 100 dollars to spend on anything, i would rather buy a huge dildo and stick it up my ass,',
        rating: 5
      });
    }
    var currentdate= new Date();
    for (let j = 1; j < 100; j++) {
      this.notifications.push({
        title: 'note ' + j + ': ' ,
        description: 'Something has happened. Please go to your orders page to reply to the customer',
        time: currentdate.getDate() + '/' + currentdate.getMonth() + '/'+ currentdate.getFullYear()
      });
    }
    this.orders = [];
    for (let i = 1; i < 15; i++) {

      this.orders.push({
        userid: 1,
        ordernumber: i,
        ordername: this.services[1].service,
        companyid: 1,
        invoice: "New toilet: 500, Installation Labour: 500",
        cost: 1000,
        status: "Pending",
        date: "Nov 15 2017"
      });
    }

    this.company = {
      username: 'company1',
      companyid: 1,
      companyname: 'Western Limited',
      description: "This company is the best company in the whole world",
      services: this.services,
      address: 'I dunno man whatever str',
      phone: 4164164161,
      email: 'email@uwo.ca',
      orders: this.orders,
      reviews: this.reviews,
      notifications: this.notifications

    }
  }



  editBusinessProfile(){
    this.navCtrl.push(EditBusinessProfilePage,{
      item: this.company1
    });

  }

  gotoOrders(){
    this.navCtrl.push(BusinessOrdersPage,{
      item: this.company1
    });
  }
  logOut(){
    this.navCtrl.setRoot(LoginPage);
  }
}
