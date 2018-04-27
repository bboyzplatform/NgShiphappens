import { Http } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs';
@Injectable()
export class MockdataService {
  url = 'http://localhost:3000';

  constructor(private http: Http) {

  }
  // get all mockup data
  getAll(): Observable<any> {
    return this.http.get(this.url + '?_sort=id&_order=desc')
      .map(response => response.json());
  }
}
