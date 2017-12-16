import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { AutoUnsubscribe } from '../../../decorators/autoUnsubscribe';
import { RaceService } from '../../../services/race/race.service';
import { find, omit, extend, map, forEach } from 'lodash';

import { Race } from '../../../models/race';
import { Paginate } from '../../../models/paginate';


@AutoUnsubscribe()
@Component({
  selector: 'app-admin-race',
  templateUrl: './admin-race.component.html',
  styleUrls: ['./admin-race.component.less']
})
export class AdminRaceComponent implements OnInit {

  public races: Paginate<Race> = new Paginate<Race>();
  public currentRace: Race = new Race();
  public now = new Date();

  constructor(

    private raceService: RaceService,
  ) {
  }

  loadRaces (page = 0) {
    this.raceService.getRaces().subscribe((paginatedRaces: Paginate<Race>) => {
      this.races = paginatedRaces;
    });
  }

  nextPage() {
    this.loadRaces(this.races.page + 1);
  }

  previousPage() {
    this.loadRaces(this.races.page - 1);
  }

  loadDetails (race: Race) {
    this.currentRace = race;
  }

  ngOnInit() {
    this.loadRaces();
  }

}
