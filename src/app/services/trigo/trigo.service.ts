import { Injectable } from '@angular/core';

import { LatLng } from 'leaflet';



@Injectable()
export class TrigoService {

    constructor(
    ) {
        this.EarthRadius = 6371;
    }

    public EarthRadius: number;

    meterToKnot(speed: number): number {
        return speed * 1.943844492;
    }

    knotToMeter(speed: number): number {
        return speed / 1.943844492;
    }

    pointAtDistanceAndBearing(from: LatLng, distKm: number, bearingDegree: number): LatLng {
        const dr = distKm / this.EarthRadius;
        const bearingRad = (bearingDegree * (Math.PI / 180));

        const latFrom = (from.lat * (Math.PI / 180));
        const lngFrom = (from.lng * (Math.PI / 180));

        const latTo = Math.asin(Math.sin(latFrom) * Math.cos(dr) + Math.cos(latFrom) * Math.sin(dr) * Math.cos(bearingRad));
        let lngTo = lngFrom + Math.atan2(
            Math.sin(bearingRad) * Math.sin(dr) * Math.cos(latFrom),
            Math.cos(dr) - (Math.sin(latFrom) * Math.sin(latTo))
        );

        lngTo = ( (lngTo + 3 * Math.PI) % (2 * Math.PI) ) - Math.PI;

        return new LatLng(latTo, lngTo);
    }

}
