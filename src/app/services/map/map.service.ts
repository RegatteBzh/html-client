import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class MapService {

  constructor(
    private http: HttpClient,
  ) { }


  loadMetadata(type: String): Observable<any> {
    return this.http.get(`/assets/data/winds/wind000.json`);
  }

}
