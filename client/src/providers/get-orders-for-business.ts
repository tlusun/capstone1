import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the GetOrdersForBusiness provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GetOrdersForBusiness {

  constructor(public http: Http) {
    console.log('Hello GetOrdersForBusiness Provider');
  }

  getOrdersForBusiness(credentials){
    console.log("getOrdersForBusiness: " , credentials.email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise (resolve => {
      this.http.get('http://localhost:8080/api/ordersforbusiness/' + credentials.email, options).map(res => res.json()).subscribe(
        data => {
          console.log("data - orders for customer: " , data);
          resolve(data);
        },
        err => {
          console.log('This has failed quite horribly. err: ', err);
        }
      );
    });
  }

}
