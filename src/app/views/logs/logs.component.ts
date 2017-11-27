import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { StreamService } from '../../services/stream/stream.service';
import { GraylogMessage } from '../../models/graylog-message';
import { Graylog } from '../../models/graylog';


class PoolLogs {
  public weather: GraylogMessage[];
  public api: GraylogMessage[];
  public move: GraylogMessage[];
}

const sliceSize = 100;

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.less']
})
export class LogsComponent implements OnInit, OnDestroy {

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
        this.logs = data.messages.slice(0, sliceSize);
        this.poolLogs.api = this.logs;
        break;
        case 'weather':
        this.logs = data.messages.slice(0, sliceSize);
        this.poolLogs.weather = this.logs;
        break;
        case 'move':
        this.logs = data.messages.slice(0, sliceSize);
        this.poolLogs.move = this.logs;
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

  ngOnDestroy() {
    if (this.poller) {
      this.poller.unsubscribe();
    }
  }

}
