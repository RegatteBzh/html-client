import { GraylogMessage } from './graylog-message';
import { map } from 'lodash';

export class Graylog {
    public fields: string[];
    public total_results: number;
    public messages: GraylogMessage[];

    constructor (messages: any[], total_results?: number, fields?: string[]) {
        this.messages = map<any, GraylogMessage>(messages, (message) => new GraylogMessage(message.message));
        this.total_results = total_results || this.messages.length;
        this.fields = fields || [];
    }
}
