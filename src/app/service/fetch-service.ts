import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class FrontFetchService {
  // PRODUCTION OR SANDBOX DEV
  setAs: String = 'sandbox'; // production or sandbox
  URL: String;

  constructor(public http: Http, public router: Router) {
    if (this.setAs === 'production') {
      this.URL = 'https://harthousewineandtapa.com/angularServices/admin/';
    } else if (this.setAs === 'sandbox') {
      this.URL = 'https://harthousewineandtapa.com/ngtest/admin/';
    }
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      this.http.post(this.URL + type, JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  postDataFile(formData, type) {
    return new Promise((resolve, reject) => {
      this.http.post(this.URL + type, formData)
        .map(response => response.json()).subscribe(
        result => {
          resolve(result);
        },
        error => {
          console.log(error);
        });
    });

  }


}