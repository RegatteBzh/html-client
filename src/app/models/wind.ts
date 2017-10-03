import { LatLng } from 'leaflet';
import { find, extend, map } from 'lodash';

export class WindHeader {

    constructor (data) {
        extend(this, data);
    }

    public dx: number;
    public dy: number;
    public la1: number;
    public lo1: number;
    public la2: number;
    public lo2: number;
    public nx: number;
    public ny: number;
    public parameterCategory: number;
    public parameterNumber: number;
    public parameterNumberName: string;
    public parameterUnit: string;
    public refTime: string;
}


export class WindAxis {

    public data: number[];
    public header: WindHeader;

    constructor(data: WindAxis) {
        this.data = data.data;
        this.header = new WindHeader(data.header);
    }

    getWindAt(position: LatLng): number {
        const x = Math.round(position.lng / this.header.dx);
        const y = Math.round(position.lat / this.header.dy);
        return this.data[y * this.header.nx + x];
    }

}

export class Wind {
    public data: WindAxis[];

    constructor(
        data?: WindAxis[],
    ) {
        this.data = map(data, (axis) => {
            return new WindAxis(axis);
        });
    }

    public getU(): WindAxis {
        return find(this.data, (axis: WindAxis) => {
            return (axis.header.parameterNumber === 2);
        });
    }

    public getV(): WindAxis {
        return find(this.data, (axis: WindAxis) => {
            return (axis.header.parameterNumber === 3);
        });
    }

    public getWindAt(position: LatLng): number[] {
        if (this.data.length !== 2) {
            return [];
        }
        const u = this.getU();
        const v = this.getV();

        if (!u || !v) {
            return [];
        }

        return [u.getWindAt(position), v.getWindAt(position)];
    }
}

export class WindSpeed {
    public value: number;
    public bearing: number;

    constructor(
        x?: number,
        y?: number
    ) {
        this.value = Math.sqrt(Math.pow(x || 0, 2) + Math.pow(y || 0, 2));
        this.bearing = this.value ? Math.atan2(y, x) * 180 / Math.PI : 0;
    }
}
