import { Component } from '@angular/core';
import { HomePage} from '../homepage/homepage';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { ShareService } from '../../providers/share-service';
import { GetCompanies } from '../../providers/get-companies'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  initializeItems(category) {


    for(let i = 1; i < 15; i++) {
      this.details = [['first service','$1500+'],['service2','Contact'],['third service','$1000-$5000']];
      this.items.push({
        title: 'Company  #' + i,
        service: this.services[Math.floor(Math.random() * this.services.length)],
        note: 'This iaj s;lf jsldjffsdfskaldfjlsdjfl;sdjkfl;fasdfsad f fs fasd fasd fasd fsad fasd fasd fasd fasd fasdf asd fasd fasd fasd fasdasdjfl;dsjafl;sdjfl;kjdsal;fjsdl;fjsladkfj;sadjfl;ksdjfl;askdjf;lasdjfl;sdjafl;sdjl;fjsdfkjsda;lfjka;sdfj;lsd sl',
        rating: Math.floor(Math.random()*10),
        image: '/assets/house.JPG',
        listpricing: this.details,
        address: '315 wharncliffe rd north',
        reviews: this.reviews

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
    if (category){
      this.company = this.company.filter((item) => {
        return (item.service.toLowerCase().indexOf(category.toLowerCase()) > -1); //|| item.service.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    }
  }
  selectedItem: any;
  registerCredentials: any;
  icons: string[];
  services: string[];
  items: Array<{title: string, service: string, note: string, rating: number, image: string, listpricing: string[][], address: string, reviews: any}>;
  searchQuery: string = '';
  details: string[][];
  reviews: Array<{companyid: number, username: String, comment: String, rating: number}>;
  company:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shareService: ShareService, private getCompanies: GetCompanies) {
    this.getCompanies.getCompanies().then(
      data => {
        this.company = data;
        console.log("this.selectedItem: ", this.company);
        //this.initializeItems(this.selectedItem);
      }
    );
    console.log('this.selectedItem in list.ts', this.company);

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('servicecategory');
    this.registerCredentials = navParams.get('registerCredentials');
    console.log("REGISTER CREDENTIALS: ", this.registerCredentials);
    this.services = ['Plumbing','Indoor Renovations','Painting','Other','Garden'];
    this.items = [];
    this.reviews=[];
    if(this.registerCredentials)
      this.shareService.setCredentials(this.registerCredentials);

  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems(this.selectedItem);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1); //|| item.service.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    }
  }



}
