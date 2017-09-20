import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLng } from 'leaflet';
import { Sail } from '../../models/sail';
import { Boat } from '../../models/boat';
import { Race } from '../../models/race';

import { Observable } from 'rxjs/Rx';

import { Skipper } from '../../models/skipper';

@Injectable()
export class SkipperService {

    constructor(
        private http: HttpClient,
    ) {

    }

    getSkipper(skipperId: number): Observable<Skipper> {
        return this.http.get<Skipper>(`/api/skippers/${skipperId}/`);
    }

    setSkipperDirection(skipperId: number, direction: number) {
        this.http.post(`/api/skippers/${skipperId}/bearing`, {
            bearing: direction
        });
    }

    getSkippers(): Observable<Skipper[]> {
        return this.http.get<Skipper[]>('/api/skippers/');
    }

}
