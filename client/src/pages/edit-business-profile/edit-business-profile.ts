import {Component} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {EditServicePage} from '../edit-service/edit-service'
import {UpdateCompanyServices} from '../../providers/update-company-services';
import {BusinessProfileService} from "../../providers/business-profile-service";
import {UpdateCompanyProfile} from "../../providers/update-company-profile";
import {BusinessProfilePage} from "../business-profile/business-profile"
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
  services: any;
  newdescription: String;
  newaddress: String;
  newphone: String;
  newprice: String;
  newservice: String;
  registerCredentials: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private updateServices: UpdateCompanyServices, private businessProfileService: BusinessProfileService, private updateCompany: UpdateCompanyProfile, private events: Events) {
    this.company = navParams.get('item');

        console.log("businessprf: ", this.company);
        this.newdescription=this.company.descriptions;
        this.newaddress=this.company.address;
        this.newphone=this.company.number;
        this.newservice=this.company.service;
        this.newprice=this.company.price;


    //this.service = [];


  }
/*
  ionViewWillEnter(){
    this.businessProfileService.getBusiness(this.registerCredentials).then(
      data => {
        this.company = data;
        console.log("businessprf: ", this.company);
        this.newdescription=this.company.descriptions;
        this.newaddress=this.company.address;
        this.newphone=this.company.number;
        this.newservice=this.company.service;
        this.newprice=this.company.price;

      }

    );
  }
*/
  remove(service) {

    this.company.services.splice(this.company.services.indexOf(service), 1);
    this.updateServices.updateServices(this.company._id,this.company.services).then(
      data => {

        //this.initializeItems(this.selectedItem);
      }
    );
  }

  editService(event, service) {
    this.navCtrl.push(EditServicePage, {
      services: this.company.services,
      index: this.company.services.indexOf(service),
      id: this.company._id
    });
  }

  addService() {
    this.company.services.push({
      name: 'New Service',
      description: 'Add your details',
      cost: 'Your Price'
    });
    console.log(this.company.services);
  }

  back() {

    this.navCtrl.pop();
  }
  save(){
    this.company.descriptions=this.newdescription;
    this.company.address=this.newaddress;
    this.company.number=this.newphone;
    this.company.service=this.newservice;
    console.log('this.dess in edit profile', this.company.descriptions);

    this.updateCompany.updateCompany(this.company._id,this.company).then(
      data => {
        //this.initializeItems(this.selectedItem);
      });

    this.navCtrl.pop();


  }



}
