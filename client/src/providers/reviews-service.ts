import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the ReviewsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ReviewsService {

  constructor(public http: Http) {
    console.log('Hello ReviewsService Provider');
  }

  createReview(userCredentials, businessDetails, review, rating){
    //console.log();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      companyEmail: businessDetails.email,
      customerEmail: userCredentials.email,
      review: review,
      rating: rating
    };

    return new Promise (resolve => {
      this.http.post('http://localhost:8080/api/review/', body ,options).map(res => res.json()).subscribe(
        data => {
          //return success
          resolve(data.success); //instead of data
        },
        err => {
          console.log('This has failed quite horribly. err: ', err);
        }
      );
    });
  }
}
