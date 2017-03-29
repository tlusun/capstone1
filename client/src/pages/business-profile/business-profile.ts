import {Component} from '@angular/core';
import {NavController, NavParams, Loading, LoadingController} from 'ionic-angular';
import {BusinessOrdersPage} from '../business-orders/business-orders';
import {EditBusinessProfilePage} from "../edit-business-profile/edit-business-profile";
import {ShareService} from "../../providers/share-service";
import {BusinessProfileService} from "../../providers/business-profile-service";
import {ReviewsService } from '../../providers/reviews-service'
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
  rating: any;
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
          this.rating =0;

          for (var i =0; i<this.reviews.length; i++){
            this.rating += this.reviews[i].rating;
          }
          if (this.reviews.length==0)
            this.rating="No ratings yet";
          else
            this.rating = this.rating/this.reviews.length;

        }
      );


  }

  ionViewWillEnter(){
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
        this.rating =0;

        for (var i =0; i<this.reviews.length; i++){
          this.rating += this.reviews[i].rating;
        }
        this.rating = this.rating/this.reviews.length;
      }
    );
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
