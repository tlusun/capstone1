import {Component} from '@angular/core';
import {NavController, NavParams, Loading, LoadingController, Events} from 'ionic-angular';
import {BusinessOrdersPage} from '../business-orders/business-orders';
import {EditBusinessProfilePage} from "../edit-business-profile/edit-business-profile";
import {ShareService} from "../../providers/share-service";
import {BusinessProfileService} from "../../providers/business-profile-service";
import {ReviewsService } from '../../providers/reviews-service'
import {LoginPage} from '../login/login';
import {HomePage} from '../homepage/homepage';

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
 reviews: any;
  company: any;
  rating: any;
  registerCredentials: any;
  loading: Loading;
  //events:Events;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shareService: ShareService, private businessProfileService: BusinessProfileService, private loadCtl: LoadingController, private reviewServ : ReviewsService, public events: Events) {
      this.registerCredentials=this.navParams.get('registerCredentials');
      //this.shareService.setCredentials(this.registerCredentials);

      if (this.registerCredentials) {
        this.businessProfileService.getBusiness(this.registerCredentials).then(
          data => {
            this.company = data;
            console.log("businessprf: ", this.company);
          }
        );

        console.log("businessprof2: ", this.company);

        this.reviewServ.getReviews(this.registerCredentials).then(
          data => {
            this.reviews = data;
            this.rating = 0;

            for (var i = 0; i < this.reviews.length; i++) {
              this.rating += this.reviews[i].rating;
            }
            if (this.reviews.length > 0) {
              this.rating = this.rating / this.reviews.length;
            }
            else
              this.rating = "No ratings yet";

          }
        );
      }


  }

/*
  ionViewWillEnter(){
    this.shareService.setCredentials(this.registerCredentials);


    this.businessProfileService.getBusiness(this.registerCredentials).then(
      data => {
        this.company = data;
        console.log("businesfdasfdsafsdafsdafsdfsasprf: ", this.company);
      }
    );

    console.log("businessprofdsfsadfsadfsdfsdafdsafasf2: ", this.company);

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
*/
  editBusinessProfile(){
    this.navCtrl.push(EditBusinessProfilePage,{
      item: this.company
    });

  }

  gotoOrders(){
    this.navCtrl.push(BusinessOrdersPage,{
      item: this.company
    });
  }
  logOut(){
    this.navCtrl.setRoot(LoginPage);
  }
}
