import { Component, OnInit } from '@angular/core';

import { SkipperService } from '../../services/skipper/skipper.service';
import { Skipper } from '../../models/skipper';

import { RaceService } from '../../services/race/race.service';
import { Race } from '../../models/race';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  public skippers: Skipper[] = [];
  public races: Race[] = [];

  constructor(
    private skipperService: SkipperService,
    private raceService: RaceService,
  ) { }

  register(id) {
    console.log('Register Race', id);
  }

  ngOnInit() {

    this.skipperService.getSkippers().then(skippers => {
      this.skippers = skippers;
    });

    this.raceService.getRaces().then(races => {
      this.races = races;
    });
  }

}
