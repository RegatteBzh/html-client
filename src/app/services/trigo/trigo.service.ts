import { Injectable } from '@angular/core';

import { LatLng } from 'leaflet';



@Injectable()
export class TrigoService {

    constructor(
    ) {
    }

    meterToKnot(speed: number): number {
        return speed * 1.943844492;
    }

    knotToMeter(speed: number): number {
        return speed / 1.943844492;
    }

}
