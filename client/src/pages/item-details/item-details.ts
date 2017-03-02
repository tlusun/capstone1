import { Component } from '@angular/core';
import { HomePage} from '../homepage/homepage';

import { NavController, NavParams } from 'ionic-angular';
import { RequestServicePage } from '../requestservice/requestservice'
import { ToastController } from 'ionic-angular';

import { RequestService } from '../../providers/request-service'
import { ShareService } from '../../providers/share-service';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  question: String;
  registerCredentials: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private requestServ: RequestService, private shareServ: ShareService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.question = "";
  }


  back(){
    this.navCtrl.pop();
  }
  requestService(){
    //TODO: requestService, must use with credentials
    this.registerCredentials = this.shareServ.getCredentials();
    console.log("this.registerCrednetials in item-details: ", this.registerCredentials);
    this.requestServ.requestService(this.registerCredentials, this.selectedItem).then(
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
    /*this.navCtrl.push(RequestServicePage, {
        item:this.selectedItem
      });
      */
      /*
    let toast = this.toastCtrl.create({
      message: 'Request Sent! Check your orders!',
      duration: 3000
    });
    toast.present();
    */
  }

  message(){
    console.log(this.question);
    if (this.question!=""){
      let toast = this.toastCtrl.create({
        message: 'Message sent! Your profile will show any replies sent to you.',
        duration: 3000
      });
      //toast.present();

    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Message is empty.',
        duration: 3000
      });
      //toast.present();
    }

    this.question="";


  }
}
