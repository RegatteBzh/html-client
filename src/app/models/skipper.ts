import { LatLng } from 'leaflet';
import { Sail } from './sail';
import { Boat } from './boat';
import { Race } from './race';

import 'rxjs/add/operator/toPromise';

export class Skipper {

    public id: Number;
    public direction: Number;
    public speed: Number;
    public position: LatLng;
    public sail: Sail;
    public boat: Boat;
    public race: Race;

    constructor(

    ) {

    }

    setParameters(position: LatLng, direction: number, speed: number) {
        this.position = position;
        this.direction = direction;
        this.speed = speed;
    }

    setBoat(fromApi: any) {
        if (fromApi) {
            this.boat = new Boat(fromApi.name, fromApi.id);
        }
    }

    setRace(fromApi: any) {
        if (fromApi) {
            this.race = new Race(fromApi.name, fromApi.id);
        }
    }

    setSail(fromApi: any) {
        if (fromApi) {
            this.sail = new Sail(fromApi.type.name, fromApi.name, fromApi.id);
        }
    }

}
