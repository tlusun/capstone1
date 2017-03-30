import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the UpdateUserProfile provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UpdateUserProfile {

  constructor(public http: Http) {
    console.log('Hello UpdateUserProfile Provider');
  }
  updateUser(id, user) {
    console.log("updateCompanyServices param id: ", id);
    console.log("updateCompanyServices param status: ", status);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise (resolve => {
      this.http.put('http://138.197.152.235/api/user/' + id, {"user": user } ,options).map(res => res.json()).subscribe(
        data => {
          console.log("successs or not?? " , data);
          resolve(data);
        },
        err => {
          console.log('This has failed quite horribly. err: ', err);
        }
      );
    });
  }
}
