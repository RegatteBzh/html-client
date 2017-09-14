import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Race } from '../../models/race';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class RaceService {

  constructor(
    private http: HttpClient,
  ) { }

  getRaces(): Promise<Race[]> {
    return this.http.get(`/api/races/`)
    .toPromise()
    .then((response: any) => {
        const races: Race[] = (response || []).map(raceElt => {
            const race = new Race();
            race.name = raceElt.name;
            race.id = raceElt.id;
            return race;
        });

        return races;
    });
}

}
