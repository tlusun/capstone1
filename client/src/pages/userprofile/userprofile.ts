import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Userprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html'
})
export class UserProfilePage {

  user: {username: String, userid: number, fullname: String, address: String, phone: number, email: String};



  constructor() {
    this.user = {
      username: 'tlusun',
      userid: 1,
      fullname: 'Tommy Lusun',
      address: '315 Wharncliffe Rd',
      phone: 4164164161,
      email: 'tlusun@uwo.ca'}

  }
}
