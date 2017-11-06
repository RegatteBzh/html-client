import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Race } from '../../models/race';
import { Skipper } from '../../models/skipper';
import { forEach } from 'lodash';
import { LatLng } from 'leaflet';

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
    return Observable.create(observer => {
      this.httpClient.get<Race[]>(`/api/races/`).subscribe((races: Race[]) => {
        forEach<Race, Race[]>(races, (race) => {
          race.end = new LatLng(race.end.lat, race.end.lng);
          race.start = new LatLng(race.start.lat, race.start.lng);
        });
        observer.next(races);
      });
    });
  }

  /**
   * Register a race
   * @param id Identifier of the race
   * @return {Observable<Skipper>}
   */
  registerRace(id: string): Observable<Skipper> {
    return this.httpClient.post<Skipper>(`/api/races/${id}/register`, {});
  }

}
