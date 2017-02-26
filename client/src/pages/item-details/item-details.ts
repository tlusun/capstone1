import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { RequestServicePage } from '../requestservice/requestservice'
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  question: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.question = "";
  }


  back(){
    this.navCtrl.pop();
  }
  requestService(){
    this.navCtrl.push(RequestServicePage, {
        item:this.selectedItem
      });
  }

  message(){
    console.log(this.question);
    let toast = this.toastCtrl.create({
      message: 'Message sent! Your profile will show any replies sent to you.',
      duration: 3000
    });
    this.question="";

    toast.present();
  }
}
