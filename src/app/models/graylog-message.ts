export class GraylogMessage {
    public _id: string;
    public msg: string;
    public level: number;
    public timestamp: Date;
    public source: string;
    public title: string;
    public full: string;
    public ip: string;
    public latency: string;
    public method: string;
    public path: string;


    constructor (data: any) {
        data.timestamp = new Date(data.timestamp);
        Object.assign(this, data);
    }
}
