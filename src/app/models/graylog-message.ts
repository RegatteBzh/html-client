export class GraylogMessage {
    public _id: string;
    public message: string;
    public level: number;
    public timestamp: Date;
    public source: string;

    constructor (data: any) {
        data.timestamp = new Date(data.timestamp);
        Object.assign(this, data);
    }
}
