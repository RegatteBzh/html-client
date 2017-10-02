import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Polar } from '../../models/polar';


@Injectable()
export class PolarService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  /**
   * Get all Available races
   * @return {Observable<Race[]>}
   */
  getPolars(sailId: string): Observable<Polar> {
    return Observable.create(observer => {
      this.httpClient.get<number[][]>(`/assets/polars/${sailId}.json`).subscribe((data: number[][]) => {
        const polarElt = new Polar(data);
        observer.next(polarElt);
      });
    });
  }



}
