import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/*
  Generated class for the UserProfileService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


export class User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  number: string;
  address: string;

  constructor(email: string, password: string, firstName: string, lastName: string, number: string, address: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
    this.address = address;
  };
}
@Injectable()
export class UserProfileService {
  currentUser: User;

  constructor(public http: Http) {
    console.log('Hello UserProfileService Provider');
    this.currentUser = null;
  }

  getUser(credentials) {
    console.log("getUser: " , credentials.email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise (resolve => {
      this.http.get('http://138.197.152.235/api/user/' + credentials.email, options).map(res => res.json()).subscribe(
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
