
export class Polar {

    public data: number[][];

    constructor(
        data?: number[][],
    ) {
        this.data = data;
    }

    getSpeedAt(wind, direction) {
        const sampledWind = Math.round(wind / 10) * 10;
        const sampledDirection = Math.round(direction / 5) * 5;
        return this.data[sampledWind][sampledDirection];
    }

}

