import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import {RegisterBusinessPage} from '../register-business/register-business'
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';
import { BusinessProfilePage } from '../business-profile/business-profile';

import { AuthService } from '../../providers/auth-service';
import { HomePage} from '../homepage/homepage';

@Component({
  selector: 'page-login',
  templateUrl: 'login-business.html'
})
export class LoginBusinessPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public createBusinessAccount() {
    this.nav.push(RegisterBusinessPage);
  }

  public loginAsUser(){
    this.nav.push(LoginPage);
  }

  public login() {
    this.showLoading()
    this.auth.loginAsBusiness(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
        this.loading.dismiss();
        this.nav.setRoot(BusinessProfilePage,{
          credentials : this.registerCredentials,
          type : 'business'
        })
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
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
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
