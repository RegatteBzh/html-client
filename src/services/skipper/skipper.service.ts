import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLng } from 'leaflet';

import { Observable } from 'rxjs/Rx';
import { forEach } from 'lodash';

import { Skipper } from '../../models/skipper';
import { Waypoint } from '../../models/waypoint';

@Injectable()
export class SkipperService {

    constructor(
        private http: HttpClient,
    ) {

    }

    getSkipper(skipperId: string): Observable<Skipper> {
        return this.http.get<Skipper>(`/api/skippers/${skipperId}/`);
    }

    setSkipperDirection(skipperId: string, bearing: number): Observable<any> {
        return this.http.post(`/api/skippers/${skipperId}/bearing`, { bearing });
    }

    getSkippers(): Observable<Skipper[]> {
        return this.http.get<Skipper[]>('/api/skippers/');
    }

    setSkipperSail(skipperId: string, sailId: string): Observable<any> {
        return this.http.post(`/api/skippers/${skipperId}/sail`, { sailId });
    }

    getWaypoints(skipperId: string): Observable<Waypoint[]> {
        return this.http.get<Waypoint[]>(`/api/skippers/${skipperId}/waypoints`);
    }

    /**
     * List all your skipper friends
     * @param skipperID skipper identifier
     * @return {Observable<Skipper[]>}
     */
    getSkipperFriends(skipperID): Observable<Skipper[]> {
        return Observable.create(observer => {
            this.http.get<Skipper[]>(`/api/skippers/${skipperID}/friends`).subscribe((skippers: Skipper[]) => {
                forEach<Skipper, Skipper[]>(skippers, (skipper: Skipper) => {
                    skipper.position = new LatLng(skipper.position.lat, skipper.position.lng);
                });
                observer.next(skippers);
            });
          }
        );
    }

}
