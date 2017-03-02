import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response , Headers, RequestOptions} from '@angular/http';


/*
  Generated class for the BusinessProfileService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BusinessProfileService {
  company: any;
  constructor(public http: Http) {
    console.log('Hello BusinessProfileService Provider');
    this.company=[];
  }

  getBusiness(credentials) {
    console.log("getUser: " , credentials.email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise (resolve => {
      this.http.get('http://localhost:8080/api/company/' + credentials.email, options).map(res => res.json()).subscribe(
        data => {
          //console.log("email: " + data.email);
          console.log("data in user-profile-service: " , data);
          //this.currentUser = data.user;
          //this.currentUser = new User(data.email, data.password, data.firstName, data.lastName, data.number, data.address);
          //this.currentUser = data;
          //currentUser = data;
          //console.log("currentUser in user-profile-service: " , this.currentUser);
          resolve(data);
        },
        err => {
          console.log('This has failed quite horribly. err: ', err);
        }
      );
    });
  }

}
