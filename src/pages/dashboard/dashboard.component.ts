import { Component, OnInit } from '@angular/core';

import { SkipperService } from '../../services/skipper/skipper.service';
import { Skipper } from '../../models/skipper';

import { RaceService } from '../../services/race/race.service';
import { Race } from '../../models/race';

import { MeService } from '../../services/me/me.service';
import { Player } from '../../models/player';
import {IonicPage, NavController} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardPage implements OnInit {

  public skippers: Skipper[] = [];
  public races: Race[] = [];
  public me: Player = new Player();

  constructor(
    private skipperService: SkipperService,
    private raceService: RaceService,
    private meService: MeService,
    private navCtrl: NavController
  ) { }

  register(id) {
    this.raceService.registerRace(id).subscribe(skipper => {
      this.navCtrl.push('Skipper', { id: skipper.id});
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
