export class GraylogMessage {
    public _id: string;
    public message: string;
    public level: number;
    public timestamp: Date;
    public source: string;
    public title: string;
    public full: string;

    constructor (data: any) {
        data.timestamp = new Date(data.timestamp);
        Object.assign(this, data);
    }
}
