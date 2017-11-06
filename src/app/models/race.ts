import { LatLng } from 'leaflet';

export class Race {

    public id: string;
    public name: string;
    public start: LatLng;
    public end: LatLng;

    constructor(
        name?: string,
        id?: string
    ) {
        this.name = name;
        this.id = id;
    }

}

