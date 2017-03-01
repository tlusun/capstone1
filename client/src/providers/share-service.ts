import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ShareService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShareService {

  loginCredentials: {
    email: String,
    password: String
  };

  constructor(public http: Http) {

    this.loginCredentials= {
      email : '',
      password : ''
    }

  }

  setCredentials(credentials){
    this.loginCredentials = credentials;
  }

  getCredentials(){
    return this.loginCredentials;
  }
}