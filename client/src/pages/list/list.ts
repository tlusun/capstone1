import { Component } from '@angular/core';
import { HomePage} from '../homepage/homepage';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { ShareService } from '../../providers/share-service';
import { GetCompanies } from '../../providers/get-companies';
import {SearchByLocation} from '../../providers/search-by-location';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  initializeItems(category) {

    if (category){
      this.filtered = this.company.filter((company) => {
        return (company.service.toLowerCase().indexOf(category.toLowerCase()) > -1); //|| item.service.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    }
    else
      this.filtered = this.company;
  }



  category: any;
  registerCredentials: any;
  services: string[];
  items: any;
  filtered: any;
  searchQuery: string = '';
  company:any;
  rating: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shareService: ShareService, private getCompanies: GetCompanies, private searchLocation: SearchByLocation) {
    this.getCompanies.getCompanies().then(
      data => {
        this.company = data;
        this.category = navParams.get('servicecategory');

        console.log("this.category: ", this.company);
        this.rating=(Math.round(parseFloat(this.company.rating)*10)/10).toFixed(1);
        this.filtered = this.company;
        this.initializeItems(this.category);
      }
    );

    // If we navigated to this page, we will have an item available as a nav param
    this.registerCredentials = navParams.get('registerCredentials');
    if(this.registerCredentials)
      this.shareService.setCredentials(this.registerCredentials);






    this.items = [];

  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems(this.category);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filtered = this.filtered.filter((filtered) => {
        return (filtered.name.toLowerCase().indexOf(val.toLowerCase()) > -1); //|| item.service.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
      console.log("filtred",this.filtered);
    }
  }
getLocation(ev: any){

  this.initializeItems(this.category);
  let val = ev.target.value;
  if (val && val.trim() != '') {
    this.searchLocation.getLocation(val).then(
      data => {
        this.filtered = data;
        console.log("location companies: ", this.filtered);

        //this.initializeItems(this.category);
      }
    );
  }
  else{
    this.filtered = this.company;
  }

}


}
