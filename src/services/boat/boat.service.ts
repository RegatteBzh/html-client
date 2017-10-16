import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sail } from '../../models/sail';
import { Boat } from '../../models/boat';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class BoatService {

    constructor(
        private http: HttpClient,
    ) {

    }

    getSails(boatId: string): Observable<Sail[]> {
        return this.http.get<Sail[]>(`/api/boats/${boatId}/sails/`);
    }


}
