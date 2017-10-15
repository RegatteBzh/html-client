import { Component, OnInit } from '@angular/core';

import { SkipperService } from '../../services/skipper/skipper.service';
import { Skipper } from '../../models/skipper';
import { Router } from '@angular/router';

import { RaceService } from '../../services/race/race.service';
import { Race } from '../../models/race';

import { MeService } from '../../services/me/me.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  public skippers: Skipper[] = [];
  public races: Race[] = [];
  public me: Player = new Player();

  constructor(
    private skipperService: SkipperService,
    private raceService: RaceService,
    private meService: MeService,
    private router: Router,
  ) { }

  register(id) {
    this.raceService.registerRace(id).subscribe(skipper => {
      this.router.navigate([`/skipper/${skipper.id}`]);
    });
  }

  ngOnInit() {

    this.skipperService.getSkippers().subscribe(skippers => {
      this.skippers = skippers;
    });

    this.raceService.getRaces().subscribe(races => {
      this.races = races;
    });

    this.meService.getIdentity().subscribe((player: Player) => {
      this.me = player;
    });

  }

}
