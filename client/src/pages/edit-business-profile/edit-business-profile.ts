import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {EditServicePage} from '../edit-service/edit-service'
/*
 Generated class for the EditBusinessProfile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit-business-profile',
  templateUrl: 'edit-business-profile.html'
})
export class EditBusinessProfilePage {

  company: any;
  service: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company = navParams.get('item');
    this.service = [];

  }

  remove(service) {

    this.company.services.splice(this.company.services.indexOf(service), 1);
  }

  editService(event, service) {
    this.navCtrl.push(EditServicePage, {
      service: service
    });
  }

  addService() {
    this.company.services.push({
      service: 'New Service',
      details: '',
      price: ''
    });
  }

  back() {

    this.navCtrl.pop();
  }

}
