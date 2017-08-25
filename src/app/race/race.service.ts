import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { LatLng } from 'leaflet';
import { Sail } from '../models/sail';
import { Boat } from '../models/boat';
import { Race } from '../models/race';

import 'rxjs/add/operator/toPromise';

import { BoatDisplay } from '../models/boatdisplay';
import { Skipper } from '../models/skipper';

@Injectable()
export class RaceService {
    private apiUrl = 'http://localhost:3000';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
    ) {

    }

    updateBoatDisplay(skipperId: number, boatDisplay: BoatDisplay): Promise<BoatDisplay> {
        return this.http.get(`${this.apiUrl}/skippers/${skipperId}`)
            .toPromise()
            .then(response => {
                const skipper = response.json();
                boatDisplay.skipper.setBoat(skipper.boat);
                boatDisplay.skipper.setRace(skipper.race);
                boatDisplay.skipper.setSail(skipper.sail);
                boatDisplay.skipper.setParameters(
                    new LatLng(skipper.position.x, skipper.position.y),
                    skipper.direction,
                    skipper.speed
                );
                return boatDisplay;
            })
            .catch(this.handleError);
    }

    getSkippers(): Promise<Skipper[]> {
        return this.http.get(`${this.apiUrl}/skippers/`)
        .toPromise()
        .then(response => {
            const skippersResponse = response.json();
            const skippers: Skipper[] = skippersResponse.map(skipperElt => {
                const skipper = new Skipper();
                skipper.setBoat(skipperElt.boat);
                skipper.setRace(skipperElt.race);
                skipper.setSail(skipperElt.sail);
                skipper.setParameters(
                    new LatLng(skipperElt.position.x, skipperElt.position.y),
                    skipperElt.direction,
                    skipperElt.speed
                );
                skipper.id = skipperElt.id;
                return skipper;
            });

            return skippers;
        })
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
}
