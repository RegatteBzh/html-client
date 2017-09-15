import { Point, LatLng } from 'leaflet';
import { Skipper } from './skipper';


export class BoatDisplay {

    public skipper: Skipper;

    public icon: string;
    public iconAnchor: Point;
    public iconSize: Point;
    public shadow: string;
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
        this.skipper = new Skipper();
    }

    setPosition(position: LatLng, direction: number, speed: number) {
        this.skipper.setParameters(position, direction, speed);
    }

    getIconUrl() {
        const direction = `000${this.skipper.direction}`.slice(-3);
        return `${this.icon}-${direction}.png`;
    }

}

