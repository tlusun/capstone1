import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the StripeCharge provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StripeCharge {

  constructor(public http: Http) {
    console.log('Hello StripeCharge Provider');
  }

  charge(inputForm){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = inputForm;

    console.log("body in inputForm: ", body );

    return new Promise (resolve => {
      this.http.post('http://localhost:8080/api/stripe/charge/', body ,options).map(res => res.json()).subscribe(
        data => {
          console.log("data in user-profile-service: " , data); //instead of data
          if (data.status) {
            console.log("success", data.status);
            resolve(data.status); //instead of data
          }
          else if (data.statusCode) {
            console.log("failure");
            //resolve({
              //statusCode: data.statusCode,
              //message: data.message
            //});
            resolve(data.message);
          }
          else{
            console.log("even more fail");
          }
        },
        err => {
          console.log('This has failed quite horribly. err: ', err);
          resolve(err);
        }
      );
    });
  }

}
