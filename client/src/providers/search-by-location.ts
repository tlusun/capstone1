import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the SearchByLocation provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchByLocation {

  constructor(public http: Http) {
    console.log('Hello SearchByLocation Provider');
  }


getLocation(location){

console.log("Get search  location s", location);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
     return new Promise (resolve => {
      this.http.get('http://138.197.152.235/api/map/new/' + location, options).map(res => res.json()).subscribe(
        data => {
          console.log("company data in SearchByLocation: " , data);
          resolve(data);
        },
        err => {
          console.log('This has failed quite horribly. err: ', err);
        }
      );
    });
}

}
