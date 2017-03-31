import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { UpdateInvoice } from '../../providers/update-invoice';

/*
 Generated class for the MessagesCompany page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-messages-company',
  templateUrl: 'messages-company.html'
})
export class MessagesCompanyPage {
  company:any;
  order:any;
  newmessage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, private updateMessage:UpdateInvoice) {

    this.company = navParams.get('user');
    this.order = navParams.get('order');

  }

  sendMessage(){
    let prompt = this.alertCtrl.create({
      title: 'New Message',
      message: "Write a new message " ,
      inputs: [
        {
          name: 'message',
          placeholder: 'Type Message Here',

        }

      ],

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (data.message != "") {
              var currentdate= new Date();
              this.newmessage = {
                author : this.company.email,
                date : currentdate.getHours()+":"+currentdate.getMinutes()+ "  "+currentdate.getDate() + '/' + (currentdate.getMonth()+1) + '/'+ currentdate.getFullYear(),
                message : data.message,
              };
              this.order.messages.push(this.newmessage);
              //TODO: ADD SERVICE HERE
              this.updateMessage.updateInvoiceMessages(this.order._id,this.order.messages);

              let toast = this.toastCtrl.create({
                message: 'Message added! Thank you for your input!',
                duration: 3000
              });
              toast.present();
              this.navCtrl.pop();


            }
            else{
              let toast = this.toastCtrl.create({
                message: 'Invalid Input, please try again.',
                duration: 3000
              });
              toast.present();
            }
          }
        }
      ]
    });

    prompt.present();

  }
  back(){
    this.navCtrl.pop();
  }
}
