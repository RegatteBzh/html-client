import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { StreamService } from '../../services/stream/stream.service';
import { GraylogMessage } from '../../models/graylog-message';
import { Graylog } from '../../models/graylog';


class PoolLogs {
  public weather: GraylogMessage[];
  public api: GraylogMessage[];
  public move: GraylogMessage[];
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.less']
})
export class LogsComponent implements OnInit {

  public logs: GraylogMessage[] = [];

  public poolLogs: PoolLogs = new PoolLogs();



  constructor(
    private streamService: StreamService,
  ) {

  }

  getStream (stream: string) {
    this.streamService.getStream('api').subscribe((data: Graylog) => {
      switch (stream) {
        case 'api':
        this.poolLogs.api = data.messages;
        this.logs = this.poolLogs.api;
        break;
        case 'weather':
        this.poolLogs.weather = data.messages;
        this.logs = this.poolLogs.weather;
        break;
        case 'move':
        this.poolLogs.move = data.messages;
        this.logs = this.poolLogs.move;
        break;
      }
    });
  }

  ngOnInit() {
    this.getStream('api');
  }

}
