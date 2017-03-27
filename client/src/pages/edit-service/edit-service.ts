import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UpdateCompanyServices} from '../../providers/update-company-services';
/*
  Generated class for the EditService page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-service',
  templateUrl: 'edit-service.html'
})
export class EditServicePage {
  company_id:any;
  services: any;
  currentservice: any;
  index : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private updateservices: UpdateCompanyServices) {
    //this.service={
    //  name: '',
    //  detail: '',
    //  pricing: ''
    //}
    this.services = navParams.get('services');
    this.index = navParams.get('index');
    this.company_id= navParams.get('id');
    this.currentservice= this.services[this.index];

  }

back(){
    this.navCtrl.pop();
}
addService(){
  this.services[this.index] = this.currentservice;
  this.updateservices.updateServices(this.company_id,this.services).then(
    data => {

      //this.initializeItems(this.selectedItem);
    }
  );
  this.navCtrl.pop();
}
}
