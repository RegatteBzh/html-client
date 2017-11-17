import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { StreamService } from '../../services/stream/stream.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.less']
})
export class LogsComponent implements OnInit {

  constructor(
    private streamService: StreamService,
  ) {

  }

  getApiStream () {
    this.streamService.getStream('api').subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {
    this.getApiStream();
  }

}
