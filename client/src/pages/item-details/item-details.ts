import { Component, ViewChild, ElementRef } from '@angular/core';
import { HomePage} from '../homepage/homepage';

import { NavController, NavParams } from 'ionic-angular';
import { RequestServicePage } from '../requestservice/requestservice'
import { ToastController } from 'ionic-angular';

import { RequestService } from '../../providers/request-service'
import { ShareService } from '../../providers/share-service';

import { ReviewsService } from '../../providers/reviews-service'


declare var google;


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;


  company: any;
  question: String;
  registerCredentials: any;
  reviews: any;
  rating: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private requestServ: RequestService, private shareServ: ShareService, private reviewServ: ReviewsService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.company = navParams.get('item');
    this.question = "";
    var companyCredentials = {
      email: this.company.email,
      password: this.company.password
    }
    this.reviewServ.getReviews(companyCredentials).then(
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
  ionViewDidLoad(){
    this.loadMap();
  }
  loadMap(){
    console.log("lat",this.company.location.latitude);
    let latLng = new google.maps.LatLng(this.company.location.latitude,this.company.location.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };



    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    var marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }

  back(){
    this.navCtrl.pop();
  }
  requestService(){
    //TODO: requestService, must use with credentials
    this.registerCredentials = this.shareServ.getCredentials();
    console.log("this.registerCrednetials in item-details: ", this.registerCredentials);

    this.navCtrl.push(RequestServicePage, {
        item:this.company,
        credentials:this.registerCredentials
      });

      /*
    let toast = this.toastCtrl.create({
      message: 'Request Sent! Check your orders!',
      duration: 3000
    });
    toast.present();
    */
  }

  message(){
    console.log(this.question);
    if (this.question!=""){
      let toast = this.toastCtrl.create({
        message: 'Message sent! Your profile will show any replies sent to you.',
        duration: 3000
      });
      //toast.present();

    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Message is empty.',
        duration: 3000
      });
      //toast.present();
    }

    this.question="";


  }
}
