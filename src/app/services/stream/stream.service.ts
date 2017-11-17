import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Graylog } from '../../models/graylog';
import { GraylogMessage } from '../../models/graylog-message';

import { forEach, find, sortBy } from 'lodash';

@Injectable()
export class StreamService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  /**
   * Get a stream log
   * @return {Observable<Graylog>}
   */
  getStream(name: string): Observable<Graylog> {
    return Observable.create(observer => {
      this.httpClient.get<any>(`/api/stream/${name}?limit=151`).subscribe((data: any) => {
        const result = new Graylog(data.messages, data.total_results, data.fields);
        sortBy(result.messages, [(elt) => -elt.timestamp.getTime()]);
        observer.next(result);
      });
    });
  }

  /**
   * Update a stream log
   * @return {Observable<Graylog>}
   */
  mergeStream(name: string, graylog: Graylog): Observable<Graylog> {
    return Observable.create(observer => {
      this.httpClient.get<any>(`/api/stream/${name}?limit=151`).subscribe((data: any) => {
        const result = new Graylog(data.messages, data.total_results, data.fields);
        forEach<GraylogMessage, GraylogMessage[]>(graylog.messages || [], (message: GraylogMessage) => {
          if (!find(result.messages, { _id: message._id })) {
            result.messages.push(message);
          }
        });
        sortBy(result.messages, [(elt) => -elt.timestamp.getTime()]);
        observer.next(result);
      });
    });
  }


}
