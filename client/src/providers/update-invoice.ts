import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the UpdateInvoice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UpdateInvoice {

  constructor(public http: Http) {
    console.log('Hello UpdateInvoice Provider');
  }

  updateInvoiceStatus(id, status) {
    console.log("updateInvoiceStatus param id: ", id);
    console.log("updateInvoiceStatus param status: ", status);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise (resolve => {
      this.http.put('http://138.197.152.235/api/order/status/' + id, {"status": status } ,options).map(res => res.json()).subscribe(
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

  updateInvoiceMessages(id, messages) {
    console.log("updateInvoiceStatus param id: ", id);
    console.log("updateInvoiceStatus param messages: ", messages);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise (resolve => {
      this.http.put('http://138.197.152.235/api/order/messages/' + id, {"messages": messages } ,options).map(res => res.json()).subscribe(
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
