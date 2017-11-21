import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLng } from 'leaflet';
import { Sail } from '../../models/sail';
import { Boat } from '../../models/boat';
import { Race } from '../../models/race';

import { Observable } from 'rxjs/Rx';
import { forEach } from 'lodash';

import { Skipper } from '../../models/skipper';
import { Waypoint } from '../../models/waypoint';
import { Status } from '../../models/status';

@Injectable()
export class SkipperService {

    constructor(
        private http: HttpClient,
    ) {

    }

    getSkipper(skipperId: string): Observable<Skipper> {
        return Observable.create(observer => {
            this.http.get<Skipper>(`/api/skippers/${skipperId}/`).subscribe((skipper: Skipper) => {
                skipper.race.start = new LatLng(skipper.race.start.lat, skipper.race.start.lng);
                skipper.race.end = new LatLng(skipper.race.end.lat, skipper.race.end.lng);
                skipper.race.dateStart = new Date(<any>skipper.race.dateStart * 1000);
                skipper.race.dateEnd = new Date(<any>skipper.race.dateEnd * 1000);
                if (skipper.finished) {
                    skipper.finished = new Date(<any>skipper.finished * 1000);
                }
                observer.next(skipper);
            });
        });
    }

    setSkipperDirection(skipperId: string, bearing: number): Observable<any> {
        return this.http.post(`/api/skippers/${skipperId}/bearing`, { bearing });
    }

    getSkippers(): Observable<Skipper[]> {
        return Observable.create(observer => {
            this.http.get<Skipper[]>('/api/skippers/').subscribe((skippers: Skipper[]) => {
                forEach<Skipper, Skipper[]>(skippers, (skipper: Skipper) => {
                    skipper.race.start = new LatLng(skipper.race.start.lat, skipper.race.start.lng);
                    skipper.race.end = new LatLng(skipper.race.end.lat, skipper.race.end.lng);
                    skipper.race.dateStart = new Date(<any>skipper.race.dateStart * 1000);
                    skipper.race.dateEnd = new Date(<any>skipper.race.dateEnd * 1000);
                    if (skipper.finished) {
                        skipper.finished = new Date(<any>skipper.finished * 1000);
                    }
                });
                observer.next(skippers);
            });
        });
    }

    setSkipperSail(skipperId: string, sailId: string): Observable<any> {
        return this.http.post(`/api/skippers/${skipperId}/sail`, { sailId });
    }

    getWaypoints(skipperId: string): Observable<Waypoint[]> {
        return this.http.get<Waypoint[]>(`/api/skippers/${skipperId}/waypoints`);
    }

    unfail(skipperId: string): Observable<Status> {
        return this.http.post<Status>(`/api/skippers/${skipperId}/unfail`, null);
    }

    setSailDown(skipperId: string, sailDown: boolean): Observable<Status> {
        return this.http.post<Status>(`/api/skippers/${skipperId}/sail-down`, { sailDown });
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
