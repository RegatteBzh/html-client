import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class StreamService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  /**
   * Get a stream log
   * @return {Observable<any>}
   */
  getStream(name: string): Observable<any> {
    return this.httpClient.get<any>(`/api/stream/${name}`);
  }


}
