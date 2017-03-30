import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Http, Response , Headers, RequestOptions} from '@angular/http';

export class User {
  email: string;
  password: string;
  /*
  firstName: string;
  lastName: string;
  number: number;
  address: string;
  */
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  };
  /*
  constructor(email: string, password: string, firstName: string, lastName: string, number: number, address: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
    this.address = address;
  }
  */
}

@Injectable()
export class AuthService {
  currentUser: User;

  constructor(public http: Http) {
    this.currentUser = null;
  }

  public login(credentials) {
    var access = false;
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('http://localhost:8080/api/authenticate',credentials, options).map(res => res.json()).subscribe(
          data => {
            console.log(data.success);
            console.log(!data.success);
            console.log(data.token);

            if (data.success) {
              access = true;
              console.log('access: ', access);
              this.currentUser = new User(credentials.email,credentials.password);
              console.log(this.currentUser);
            }
            console.log('access1: ', access);
            observer.next(access);
            observer.complete();
          },
          err => {
            console.log('This has failed quite horribly. err: ', err);
          }
        );
        console.log('ACCESS: ', access);
        //observer.next(access);
        //observer.complete();
      });
    }
  }

  public loginAsBusiness(credentials) {
    var access = false;
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('http://localhost:8080/api/authenticate-business',credentials, options).map(res => res.json()).subscribe(
          data => {
            console.log(data.success);
            console.log(!data.success);
            console.log(data.token);

            if (data.success) {
              access = true;
              console.log('access: ', access);
              this.currentUser = new User(credentials.email,credentials.password);
              console.log(this.currentUser);
            }
            console.log('access1: ', access);
            observer.next(access);
            observer.complete();
          },
          err => {
            console.log('This has failed quite horribly. err: ', err);
          }
        );
        console.log('ACCESS: ', access);
        //observer.next(access);
        //observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
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

  public registerBusiness(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post('http://localhost:8080/api/signupbusiness',credentials, options).map(res => res.json()).subscribe(
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
