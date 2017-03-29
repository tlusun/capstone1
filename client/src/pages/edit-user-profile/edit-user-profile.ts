import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UpdateUserProfile} from '../../providers/update-user-profile';
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
  address: any;
  name: any;
  number: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private updateProfile: UpdateUserProfile) {
    this.user = this.navParams.get('user');
    this.address = this.user.address;
    this.name = this.user.firstName;
    this.number = this.user.number;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserProfilePage');
  }


  back(){
    this.navCtrl.pop();
  }
  save(){

    this.user.address = this.address;
    this.user.firstName= this.name;
    this.user.number = this.number;
    this.updateProfile.updateUser(this.user._id,this.user).then(
      data => {
        //this.initializeItems(this.selectedItem);
      });
    this.navCtrl.pop();
  }
}
