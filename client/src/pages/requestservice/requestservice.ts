import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HomePage} from '../homepage/homepage';

/*
  Generated class for the Requestservice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-requestservice',
  templateUrl: 'requestservice.html'
})
export class RequestServicePage {
  selectedItem: any;

  requestedservice: String;
  usernote: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {

    this.selectedItem = navParams.get('item');

  }




  cancel(){

    this.navCtrl.pop();
  }

  submit(){

    let toast = this.toastCtrl.create({
      message: 'Request Sent! Check for updates in your profile!',
      duration: 3000
    });
    toast.present();
    this.navCtrl.popToRoot();
  }
}


