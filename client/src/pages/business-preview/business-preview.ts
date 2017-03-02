import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the BusinessPreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-business-preview',
  templateUrl: 'business-preview.html'
})
export class BusinessPreviewPage {
    company: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company = navParams.get('user');
  }



}
