import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Boat } from '../models/boat';

@Injectable()
export class RaceService {
    private apiUrl = 'http://localhost:3000';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
    ) {

    }

    updateBoat(skipperId: number, boat: Boat): Promise<Boat> {
        return this.http.get(`${this.apiUrl}/skippers/${skipperId}`)
            .toPromise()
            .then(response => {
                const skipper = response.json();
                boat.position.lat = skipper.position.x;
                boat.position.lng = skipper.position.y;
                boat.speed = skipper.speed;
                boat.direction = skipper.direction;
                return boat;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
}
