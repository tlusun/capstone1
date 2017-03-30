import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserOrdersPage} from "../userorders/userorders";
import {HomePage} from '../homepage/homepage';
import {AlertController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {EditUserProfilePage} from '../edit-user-profile/edit-user-profile';
import {UserProfileService} from '../../providers/user-profile-service';

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
  user : any;
  loginCredentials: any;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private userProfileService:UserProfileService) {

    this.loginCredentials = this.navParams.get('registerCredentials');
    if (this.loginCredentials) {

    this.userProfileService.getUser(this.loginCredentials).then(
      data => {
        this.user = data;
        console.log("user2: ", this.user);
      }
    );
  }
  }

  openPage() {

    this.navCtrl.push(UserOrdersPage, {
      item: this.user
    });
  }

  edit() {
    this.navCtrl.push(EditUserProfilePage, {
      user: this.user
    });

  }
  logOut(){
    this.navCtrl.setRoot(LoginPage);
  }
}
