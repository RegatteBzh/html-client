import { Point, LatLng } from 'leaflet';

export class Boat {
    position: LatLng;
    angle: number;
    speed: number;
    icon: string;
    iconAnchor: Point;
    iconSize: Point;
    shadow: string;
    shadowAnchor: Point;
    shadowSize: Point;

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

    setPosition(position: LatLng, angle: number, speed: number) {
        this.position = position;
        this.angle = angle;
        this.speed = speed;
    }

    getIconUrl() {
        const angle = `000${this.angle}`.slice(-3);
        return `${this.icon}-${angle}.png`;
    }
}
