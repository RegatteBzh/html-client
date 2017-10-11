import { LatLng } from 'leaflet';
import { first, last } from 'lodash';

export class Forecast {

    public way: LatLng[];
    public speed: number[];

    constructor() {
        this.way = [];
        this.speed = [];
    }

    getFirstSpeed (): number {
        return first(this.speed);
    }

    getLastPosition (): LatLng {
        return last(this.way);
    }

}

