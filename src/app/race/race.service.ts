import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LatLng } from 'leaflet';
import { Sail } from '../models/sail';
import { Boat } from '../models/boat';
import { Race } from '../models/race';

import 'rxjs/add/operator/toPromise';

import { BoatDisplay } from '../models/boatdisplay';
import { Skipper } from '../models/skipper';
import { ConfigService } from '../config.service';

@Injectable()
export class RaceService {

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
    ) {

    }

    updateBoatDisplay(skipperId: number, boatDisplay: BoatDisplay): Promise<BoatDisplay> {
        return this.http.get(`/api/skippers/${skipperId}`)
            .toPromise()
            .then((response: any) => {
                boatDisplay.skipper.setBoat(response.boat);
                boatDisplay.skipper.setRace(response.race);
                boatDisplay.skipper.setSail(response.sail);
                boatDisplay.skipper.setParameters(
                    new LatLng(response.position.lng, response.position.lat),
                    response.direction,
                    response.speed
                );
                return boatDisplay;
            })
            .catch(this.handleError);
    }

    getSkippers(): Promise<Skipper[]> {
        return this.http.get(`/api/skippers/`)
        .toPromise()
        .then((response: any) => {
            const skippers: Skipper[] = (response || []).map(skipperElt => {
                const skipper = new Skipper();
                skipper.setBoat(skipperElt.boat);
                skipper.setRace(skipperElt.race);
                skipper.setSail(skipperElt.sail);
                skipper.setParameters(
                    new LatLng(skipperElt.position.lng, skipperElt.position.lat),
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
