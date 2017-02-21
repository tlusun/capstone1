import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  initializeItems() {

    for(let i = 1; i < 15; i++) {
      this.items.push({
        title: 'Company  #' + i,
        service: this.services[Math.floor(Math.random() * this.services.length)],
        note: 'This is service #' + i,
        rating: Math.floor(Math.random()*10),
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }
  selectedItem: any;
  icons: string[];
  services: string[];
  items: Array<{title: string, service: string, note: string, rating: number, icon: string}>;
  searchQuery: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];
    this.services = ['Plumbing','Indoor Renovations','Painting','Other','Garden'];
    this.items = [];
    this.initializeItems();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.service.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      })
    }
  }



}
