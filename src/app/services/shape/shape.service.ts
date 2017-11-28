import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shape } from '../../models/shape';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class ShapeService {

    constructor(
        private http: HttpClient,
    ) {

    }

    getShapes(): Observable<Shape[]> {
        return this.http.get<Shape[]>(`/assets/shapes.json`);
    }
}
