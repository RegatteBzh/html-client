import { LatLng } from 'leaflet';
import { Skipper } from './skipper';

export class Waypoint {

    public skipper: Skipper;
    public position: LatLng;
    public speed: number;
    public time: number;

    constructor(
    ) {
    }

}

