import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController, LoadingController, Loading} from 'ionic-angular';
import { StripeCharge } from '../../providers/stripe-charge';

/*
  Generated class for the StripePay page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stripe-pay',
  templateUrl: 'stripe-pay.html'
})
export class StripePayPage {
  loading: Loading;
  user: any;
  order: any;
  inputForm: any;

  /*
  * Helper functions
  */
  todayFormatted() {
    var d = new Date();
    var m = d.getMonth()+1;
    var y = d.getFullYear();
    if (m < 10) {
      return y + '-0' + m;
    } else {
      return y + '-' + m;
    }
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, private stripeCharge: StripeCharge, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.user = navParams.get('user');
    this.order = navParams.get('order');
    console.log("this.user: ", this.user);
    console.log("this.order: ", this.order);

    /**
    * Init
    */
    this.inputForm = {
      currency: 'CAD', //TODO: should we change currency according to location?
      amountCents: this.order.amount*100, //TODO: convert to cents
      date: this.todayFormatted(),   // default init
      number: 4242424242424242,      // default number
      name: this.user.firstName,           // TODO: first and last name
      cvc: 123,                      // default cvc
      destination: {
        account: this.order.account_id_stripe
      },
      description: "Payment from " + this.user.firstName +" (email: "+ this.user.email +")  to " + this.order.businessEmail + ", service: " + this.order.service + " for " + this.order.amount + " dollars"
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StripePayPage');
  }

  charge() {
    console.log("CHARGE!");
    // obtain the exp_month and exp_year
    var split = this.inputForm['date'].split('-');
    this.inputForm['exp_month'] = split[1];
    this.inputForm['exp_year']  = split[0];

    console.log("inputForm: ", this.inputForm);

    this.showLoading();

    this.stripeCharge.charge(this.inputForm).then(
      allowed => {
        if (allowed === "succeeded") {
          console.log("allowed: ", allowed);
          this.showSuccess("Payment success.");
          this.navCtrl.pop();
        } else { //if (allowed.statusCode){
          this.showError("Error: " + allowed);
          this.navCtrl.pop();
        }
      }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }


  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Payment Failed. :(',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showSuccess(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Payment Success! :)',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
