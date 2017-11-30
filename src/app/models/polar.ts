
export class Polar {

    public data: number[][];

    constructor(
        data?: number[][],
    ) {
        this.data = data;
    }

    getSpeedCoefAt(wind: number, direction: number): number {
        let sampledWind0 = Math.floor(wind / 10);
        if (this.data.length < sampledWind0 + 1) {
            sampledWind0 = this.data.length - 1;
        }
        let sampledWind1 = sampledWind0 + 1;
        if (this.data.length < sampledWind1 + 1) {
            sampledWind1 = sampledWind0;
        }
        const sampledDirection0 = Math.floor(direction / 5) % 180;
        const sampledDirection1 = Math.ceil((direction + 5) / 5) % 180;
        return this.interpolation(
            wind / 10 - Math.floor(wind / 10),
            (direction % 180) / 5 - sampledDirection0,
            this.data[sampledWind0][sampledDirection0],
            this.data[sampledWind1][sampledDirection0],
            this.data[sampledWind0][sampledDirection1],
            this.data[sampledWind1][sampledDirection1],
        );
    }

     /**
     * Interpolate value
     * @param x variation between g0* and g1*
     * @param y variation between g*0 dans g*1
     * @param g00 point at col_0 and line_0
     * @param g10 point at col_1 and line_0
     * @param g01 point at col_0 and line_1
     * @param g11 point at col_1 and line_1
     * @return interpolated vector
     */
    interpolation (x: number, y: number, g00: number, g10: number, g01: number, g11: number): number {
        const rx = (1 - x);
        const ry = (1 - y);
        const a = rx * ry;
        const b = x * ry;
        const c = rx * y;
        const d = x * y;
        return g00 * a + g10 * b + g01 * c + g11 * d;
    }

}

