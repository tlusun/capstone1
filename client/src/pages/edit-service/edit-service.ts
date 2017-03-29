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
  description: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private updateservices: UpdateCompanyServices) {
    this.currentservice={
      name: '',
      detail: '',
      pricing: ''
    }

    this.services = navParams.get('services');
    this.index = navParams.get('index');
    this.company_id= navParams.get('id');
    this.currentservice.name= this.services[this.index].name;
    this.description= this.services[this.index].description;

    this.currentservice.cost= this.services[this.index].cost;
    console.log("description",this.description);
    console.log("cost",this.currentservice.cost);
  }

back(){
    this.navCtrl.pop();
}
addService(){
  this.currentservice.description= this.description;
  this.services[this.index] = this.currentservice;
  this.updateservices.updateServices(this.company_id,this.services).then(
    data => {

      //this.initializeItems(this.selectedItem);
    }
  );
  this.navCtrl.pop();
}
}
