import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../services/config/config.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class MapService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }


  loadMetadata(type: String): Observable<any> {
    return this.http.get(`${environment.apiUrl}/data/wind000.json`);
  }

}
