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
@Injectable()

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

export class UserProfileService {
  currentUser: User;

  constructor(public http: Http) {
    console.log('Hello UserProfileService Provider');
    this.currentUser = null;
  }

  getUser(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.get('http://localhost:8080/api/user/' + credentials.email, options).map(res => res.json()).subscribe(
          data => {
            this.currentUser = new User(data.email, data.password, data.firstName, data.lastName, data.number, data.address);
            console.log(this.currentUser);

            observer.next(true);
            observer.complete();
          },
          err => {
            console.log('This has failed quite horribly. err: ', err);
          }
        );
      });
    }
  }
}
