import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLng } from 'leaflet';
import { Sail } from '../../models/sail';
import { Boat } from '../../models/boat';
import { Race } from '../../models/race';

import { Observable } from 'rxjs/Rx';

import { BoatDisplay } from '../../models/boatdisplay';
import { Skipper } from '../../models/skipper';

@Injectable()
export class SkipperService {

    constructor(
        private http: HttpClient,
    ) {

    }

    updateBoatDisplay(skipperId: number, boatDisplay: BoatDisplay): Observable<BoatDisplay> {
        return this.http.get<Skipper>(`/api/skippers/${skipperId}`).map((skipper) => {
            boatDisplay.skipper.setBoat(skipper.boat);
            boatDisplay.skipper.setRace(skipper.race);
            boatDisplay.skipper.setSail(skipper.sail);
            boatDisplay.skipper.setParameters(
                new LatLng(skipper.position.lng, skipper.position.lat),
                skipper.direction,
                skipper.speed
            );
            return boatDisplay;
        });

    }

    getSkippers(): Observable<Skipper[]> {
        return this.http.get<Skipper[]>('/api/skippers/');
    }

}
