import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Http, Response , Headers, RequestOptions} from '@angular/http';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;
  posts: any; //TODO

  constructor(public http: Http) {
    this.currentUser = null;
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        //TODO
        //At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      //TODO: testing
      /*
      var response = this.http.get('http://localhost:8080/').map(res => res.json()).subscribe(
        data => {
          console.log('data', data.message);
        },
        err => {
          console.log('This has failed quite horribly. err: ', err);
        }
      );
      */
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post('http://localhost:8080/api/signup',credentials, options).map(res => res.json()).subscribe(
        data => {
          console.log(data.success);
          console.log(data.msg);
        },
        err => {
          console.log('This has failed quite horribly. err: ', err);
        }
      );

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
