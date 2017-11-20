import { LatLng } from 'leaflet';
import { Boat } from './boat';

export class Race {

    public id: string;
    public name: string;
    public description: string;
    public start: LatLng;
    public end: LatLng;
    public dateStart: Date;
    public dateEnd: Date;
    public endRayKm: number;
    public allowedBoat: Boat;

    constructor(
        name?: string,
        id?: string
    ) {
        this.name = name;
        this.id = id;
        this.start = new LatLng(0, 0);
        this.end = new LatLng(0, 0);
        this.allowedBoat = new Boat();
    }

}

