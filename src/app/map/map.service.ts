import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../config.service';

@Injectable()
export class MapService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }


  loadMetadata(type: String): Observable<any> {
    return this.http.get(`${this.configService.apiUrl()}/data/wind000.json`);
  }

}
