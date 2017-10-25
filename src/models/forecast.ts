import { LatLng } from 'leaflet';
import { first, last } from 'lodash';

export class Forecast {

    public way: LatLng[];
    public speed: number[];
    public windSpeedKnot: number[];
    public windRelativeBearings: number[];
    public windBearing: number[];
    public distanceKm: number[];

    constructor() {
        this.way = [];
        this.speed = [];
        this.windRelativeBearings = [];
        this.windBearing = [];
        this.windSpeedKnot = [];
        this.distanceKm = [];
    }

    getFirstSpeed (): number {
        return first(this.speed);
    }

    getLastPosition (): LatLng {
        return last(this.way);
    }

    getFirstWindDirection (): number {
        return first(this.windRelativeBearings);
    }

}

