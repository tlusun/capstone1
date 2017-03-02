import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import {RegisterBusinessPage} from '../register-business/register-business'
import { ListPage } from '../list/list';
import {LoginBusinessPage} from '../login-business/login-business';
import { ShareService} from '../../providers/share-service';
import { AuthService } from '../../providers/auth-service';
import { HomePage} from '../homepage/homepage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: '', type: 'user'};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private shareServ: ShareService) {}

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public createBusinessAccount() {
    this.nav.push(RegisterBusinessPage);
  }

  public loginAsBusiness(){
    this.nav.push(LoginBusinessPage);
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
        this.loading.dismiss();
        this.registerCredentials.type='user';
        this.shareServ.setCredentials(this.registerCredentials);
        this.nav.setRoot(ListPage, {
          registerCredentials: this.registerCredentials
        });

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
