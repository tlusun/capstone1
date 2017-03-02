import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RequestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RequestService {

  constructor(public http: Http) {
    console.log('Hello RequestService Provider');
  }

  requestService(userCredentials, businessDetails){
    console.log("userCredentials in request-service.ts: " , userCredentials.email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      userEmail: userCredentials.email,
      amount: businessDetails.price,
      service: businessDetails.service,
      date: new Date().toISOString(), //TODO: make sure this works!
      businessEmail: businessDetails.email,
      status: "Pending"
    }

    return new Promise (resolve => {
      this.http.post('http://localhost:8080/api/order/', body ,options).map(res => res.json()).subscribe(
        data => {
          console.log("data in user-profile-service: " , data.success); //instead of data
          resolve(data.success); //instead of data
        },
        err => {
          console.log('This has failed quite horribly. err: ', err);
        }
      );
    });
  }
}
