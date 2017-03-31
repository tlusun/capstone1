import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HomePage} from '../homepage/homepage';
import { RequestService } from '../../providers/request-service'
import { UserProfileService } from '../../providers/user-profile-service';
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
  company: any;
  registerCredentials: any;
  businessDetails: any;
  requestedservice: any;
  usernote: String;
  cost: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,private requestServ: RequestService, private userServ: UserProfileService) {

    this.company = navParams.get('item');
    this.registerCredentials =  navParams.get('credentials');
    this.userServ.getUser(this.registerCredentials).then(
      data => {
        this.user = data;
        console.log("user2: ", this.user);
      }
    );

  }

  cancel(){

    this.navCtrl.pop();
  }

  submit(){
    this.cost = this.company.services.filter(item =>item.name==this.requestedservice);
    this.businessDetails = {
      email: this.company.email,
      service: this.requestedservice,
      price: this.cost[0].cost,
      userAddress: this.user.address

    };
    console.log(this.businessDetails);
    this.requestServ.requestService(this.registerCredentials, this.businessDetails).then(
      data => {
        //TODO: EDIT THIS!!!
        if (data){
          let toast = this.toastCtrl.create({
            message: 'Request Sent! Check your orders!',
            duration: 3000
          });
          toast.present();
        }
        else{
          let toast = this.toastCtrl.create({
            message: 'Request Not Sent! There is an error somewhere :(',
            duration: 3000
          });
          toast.present();
        }
      }
    );
    this.navCtrl.popToRoot();
  }
}
