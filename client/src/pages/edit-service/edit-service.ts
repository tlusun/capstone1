import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EditService page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-service',
  templateUrl: 'edit-service.html'
})
export class EditServicePage {

  services: any;
  currentservice: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.service={
    //  name: '',
    //  detail: '',
    //  pricing: ''
    //}
    this.currentservice = navParams.get('service');

  }


addService(){

  this.navCtrl.pop();
}
}
