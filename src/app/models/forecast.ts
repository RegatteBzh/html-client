import { LatLng } from 'leaflet';
import { first, last } from 'lodash';

export class Forecast {

    public way: LatLng[];
    public speed: number[];
    public windRelativeBearings: number[];
    public windBearing: number[];

    constructor() {
        this.way = [];
        this.speed = [];
        this.windRelativeBearings = [];
        this.windBearing = [];
    }

    getFirstSpeed (): number {
        return first(this.speed);
    }

    getLastPosition (): LatLng {
        return last(this.way);
    }

}

