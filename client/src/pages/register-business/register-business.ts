import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register-business.html'
})
export class RegisterBusinessPage {
  createSuccess = false;
  registerCredentials = {
    email: '',
    name: '',
    owner: '',
    number: '',
    address: '',
    services: {
      service: '',
      details: '',
      price: ''
    },
    descriptions: '',
    password: '',
  };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}
  public registerBusiness() {
    this.auth.registerBusiness(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
          this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
    error => {
      this.showPopup("Error", error);
    });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
  back(){
    this.nav.pop();
  }
}
