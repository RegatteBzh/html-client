import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Race } from '../../models/race';
import { Skipper } from '../../models/skipper';


@Injectable()
export class RaceService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  /**
   * Get all Available races
   * @return {Observable<Race[]>}
   */
  getRaces(): Observable<Race[]> {
    return this.httpClient.get<Race[]>(`/api/races/`);
  }

  /**
   * Register a race
   * @param id Identifier of the race
   * @return {Observable<Skipper>}
   */
  registerRace(id: number): Observable<Skipper> {
    return this.httpClient.post<Skipper>(`/api/races/${id}/register`, {});
  }

}
