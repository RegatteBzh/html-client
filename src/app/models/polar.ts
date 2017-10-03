
export class Polar {

    public data: number[][];

    constructor(
        data?: number[][],
    ) {
        this.data = data;
    }

    getSpeedAt(wind: number, direction: number) {
        const sampledWind = Math.round(wind / 10);
        const sampledDirection = Math.round((direction % 180) / 5);
        if (this.data.length > sampledWind) {
            return this.data[sampledWind][sampledDirection];
        } else {
            return this.data[this.data.length - 1][sampledDirection];
        }
    }

}

