
export class Polar {

    public data: number[][];

    constructor(
        data?: number[][],
    ) {
        this.data = data;
    }

    getSpeedAt(wind: number, direction: number) {
        const sampledWind0 = Math.floor(wind / 10);
        const sampledWind1 = sampledWind0 + 1;
        const sampledDirection = Math.round((direction % 180) / 5);
        if (this.data.length > sampledWind0) {
            if (this.data.length > sampledWind1) {
                const coef = (wind - Math.floor(wind / 10) * 10) / 10;
                const interp1 = this.data[sampledWind1][sampledDirection];
                const interp0 = this.data[sampledWind0][sampledDirection];
                return interp0 + (interp1 - interp0) * coef;
            }

            return this.data[sampledWind0][sampledDirection];
        } else {
            return this.data[this.data.length - 1][sampledDirection];
        }
    }

}

