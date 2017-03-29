import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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


getLocation(){ 

console.log("Get search  location s");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
     return new Promise (resolve => {
      this.http.get('http://localhost:8080/map/new/:location', options).map(res => res.json()).subscribe(
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
