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
    var currentdate= new Date();
    var body = {
      userEmail: userCredentials.email,
      amount: businessDetails.price,
      service: businessDetails.service,
      date: currentdate.getHours()+":"+currentdate.getMinutes()+ "  "+currentdate.getDate() + '/' + (currentdate.getMonth()+1) + '/'+ currentdate.getFullYear(),
      businessEmail: businessDetails.email,
      userAddress: businessDetails.userAddress,
      invoice: "",
      status: "Pending"
    }
    console.log("BODY", body);
    return new Promise (resolve => {
      this.http.post('http://138.197.152.235/api/order/', body ,options).map(res => res.json()).subscribe(
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
