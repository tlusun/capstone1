import { Component ,ElementRef,ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ShareService,} from "../../providers/share-service";
import {BusinessProfileService} from "../../providers/business-profile-service";
import {ReviewsService } from '../../providers/reviews-service'
/*
  Generated class for the BusinessPreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;

@Component({
  selector: 'page-business-preview',
  templateUrl: 'business-preview.html'
})
export class BusinessPreviewPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
    company: any;
    registerCredentials: any;
    rating: any;
    reviews: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private shareService: ShareService, private businessProfileService: BusinessProfileService, private reviewServ : ReviewsService) {
    this.registerCredentials=this.navParams.get('registerCredentials');
    this.shareService.setCredentials(this.registerCredentials);


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

}
