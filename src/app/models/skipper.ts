import { LatLng } from 'leaflet';
import { Sail } from './sail';
import { Boat } from './boat';
import { Race } from './race';


export class Skipper {

    public id: string;
    public direction: number;
    public speed: number;
    public position: LatLng;
    public sail: Sail;
    public boat: Boat;
    public race: Race;
    public windAngle: number;
    public windSpeed: number;

    constructor(
    ) {
        this.position = new LatLng(0, 0);
        this.sail = new Sail();
        this.boat = new Boat();
        this.race = new Race();
    }

    setParameters(position: LatLng, direction: number, speed: number) {
        this.setPosition(position);
        this.setDirection(direction);
        this.setSpeed(speed);
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

    setPosition(position: LatLng) {
        this.position = position;
    }

    setDirection(direction: number) {
        this.direction = direction;
    }

    setSpeed(speed: number) {
        this.speed = speed;
    }

}

