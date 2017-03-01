import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response , Headers, RequestOptions} from '@angular/http';


/*
  Generated class for the BusinessProfileService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BusinessProfileService {
  company: any;
  constructor(public http: Http) {
    console.log('Hello BusinessProfileService Provider');
    this.company=[];
  }

  public getBusinessProfile(){


  }

}
