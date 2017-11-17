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
  public currentStream = 'api';
  private poller: Subscription = null;


  constructor(
    private streamService: StreamService,
  ) {

  }

  getStream (stream: string) {
    switch (stream) {
      case 'api':
      this.logs = this.poolLogs.api;
      break;
      case 'weather':
      this.logs = this.poolLogs.weather;
      break;
      case 'move':
      this.logs = this.poolLogs.move;
      break;
    }
    this.streamService.mergeStream(stream, this.logs).subscribe((data: Graylog) => {
      switch (stream) {
        case 'api':
        this.logs = data.messages.slice(0, 20);
        break;
        case 'weather':
        this.logs = data.messages.slice(0, 20);
        break;
        case 'move':
        this.logs = data.messages.slice(0, 20);
        break;
      }
      console.log(this.logs);
    });
  }

  switch (stream: string) {
    this.startPoller(stream);
  }

  startPoller(stream: string) {
    if (this.poller) {
      this.poller.unsubscribe();
      this.currentStream = stream;
      this.poller = null;
    }
    this.poller = Observable.timer(0, 5000).subscribe(() => {
      this.getStream(this.currentStream);
    });
  }

  trackByFn(index, item) {
    return item._id;
  }

  ngOnInit() {
    this.startPoller(this.currentStream);
  }

}
