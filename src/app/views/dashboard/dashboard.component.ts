import { Component, OnInit } from '@angular/core';

import { RaceService } from '../../services/race/race.service';
import { Skipper } from '../../models/skipper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  public skippers: Skipper[] = [];

  constructor(private raceService: RaceService) { }

  ngOnInit() {

    this.raceService.getSkippers().then(skippers => {
      this.skippers = skippers;
    });
  }

}
