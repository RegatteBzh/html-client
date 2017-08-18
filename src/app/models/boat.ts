import { Point, LatLng } from 'leaflet';

import 'rxjs/add/operator/toPromise';

export class Boat {

    public position: LatLng;
    public direction: number;
    public speed: number;
    public icon: string;
    public iconAnchor: Point;
    public iconSize: Point;
    public shadow: string;
    public hadowAnchor: Point;
    public shadowSize: Point;
    public shadowAnchor: Point;

    constructor(
        icon: string,
        iconAnchor: Point,
        iconSize: Point,
        shadow?: string,
        shadowAnchor?: Point,
        shadowSize?: Point
    ) {
        this.icon = icon;
        this.iconAnchor = iconAnchor;
        this.iconSize = iconSize;
        this.shadow = shadow || '';
        this.shadowAnchor = shadowAnchor || new Point(0, 0);
        this.shadowSize = shadowSize || new Point(0, 0);
    }

    setPosition(position: LatLng, direction: number, speed: number) {
        this.position = position;
        this.direction = direction;
        this.speed = speed;
    }

    getIconUrl() {
        const direction = `000${this.direction}`.slice(-3);
        return `${this.icon}-${direction}.png`;
    }

}

