import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EditUserProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-user-profile',
  templateUrl: 'edit-user-profile.html'
})
export class EditUserProfilePage {
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserProfilePage');
  }


  back(){
    this.navCtrl.pop();
  }
  save(){

  }
}
