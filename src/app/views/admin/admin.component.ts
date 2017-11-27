import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { AutoUnsubscribe } from '../../decorators/autoUnsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {




  constructor(

  ) {

  }

  ngOnInit() {

  }

}
