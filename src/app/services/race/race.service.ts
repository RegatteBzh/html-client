import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Race } from '../../models/race';
import { Skipper } from '../../models/skipper';
import { Paginate } from '../../models/paginate';
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
  getAvailableRaces(): Observable<Race[]> {
    return Observable.create(observer => {
      this.httpClient.get<Race[]>(`/api/races/available`).subscribe((races: Race[]) => {
        forEach<Race, Race[]>(races, (race) => {
          race.end = new LatLng(race.end.lat, race.end.lng);
          race.start = new LatLng(race.start.lat, race.start.lng);
          race.dateStart = new Date(<any>race.dateStart * 1000);
          race.dateEnd = new Date(<any>race.dateEnd * 1000);
        });
        observer.next(races);
      });
    });
  }

  /**
   * Get all races
   * @return {Observable<Paginate<Race>>}
   */
  getRaces(): Observable<Paginate<Race>> {
    return this.httpClient.get<Paginate<Race>>(`/api/races/`).map((paginated: Paginate<Race>) => {
      forEach<Race, Race[]>(paginated.data, (race) => {
        race.end = new LatLng(race.end.lat, race.end.lng);
        race.start = new LatLng(race.start.lat, race.start.lng);
        if (race.dateStart) {
          race.dateStart = new Date(<any>race.dateStart * 1000);
        }
        if (race.dateEnd) {
          race.dateEnd = new Date(<any>race.dateEnd * 1000);
        }
      });
      return paginated;
    });
  }

  /**
   * Register a race
   * @param id Identifier of the race
   * @return {Observable<Skipper>}
   */
  registerRace(id: string): Observable<Skipper> {
    return this.httpClient.post<Skipper>(`/api/races/register/${id}`, {});
  }

  /**
   * Create a new Race
   * @param race Race to create
   * @return {Observable<Race>}
   */
  createRace(race: Race): Observable<Race> {
    return Observable.create(observer => {
      console.log(race);
      this.httpClient.post<any>('/api/races/create', {
        name: race.name,
        description: race.description,
        start: { lat: race.start.lat, lng: race.start.lng },
        end: { lat: race.end.lat, lng: race.end.lng },
        dateStart: race.dateStart ? race.dateStart.getTime() / 1000 : undefined,
        dateEnd: race.dateEnd ? race.dateEnd.getTime() / 1000 : undefined,
        endRayKm: race.endRayKm,
        allowedBoat: race.allowedBoat.id
      }).subscribe((createdRace: Race) => {
        createdRace.end = new LatLng(createdRace.end.lat, createdRace.end.lng);
        createdRace.start = new LatLng(createdRace.start.lat, createdRace.start.lng);
        observer.next(createdRace);
      });
    });
  }

}
