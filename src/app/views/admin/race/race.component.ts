import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { AutoUnsubscribe } from '../../../decorators/autoUnsubscribe';

import { BoatService } from '../../../services/boat/boat.service';
import { RaceService } from '../../../services/race/race.service';

import { Boat } from '../../../models/boat';
import { Race } from '../../../models/race';
import { find, first } from 'lodash';

@AutoUnsubscribe()
@Component({
  selector: 'app-admin-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.less']
})
export class RaceComponent implements OnInit {

  public boats: Boat[] = [];
  public race: Race = new Race();
  public races: Race[] = [];


  constructor(
    private boatService: BoatService,
    private raceService: RaceService,
  ) {

  }

  select (race?: Race) {
    if (race) {
      this.race = race;
    } else {
      this.race = new Race();
      this.race.start.lat = 65.633160;
      this.race.start.lng = 24.474649;
      this.race.end.lat = 56.007159;
      this.race.end.lng = -5.358278;
    }
  }

  loadRaces() {
    this.raceService.getRaces().subscribe((races: Race[]) => {
      this.races = races;
    });
  }

  loadBoats() {
    this.boatService.getBoats().subscribe((boats: Boat[]) => {
      this.boats = boats;
      this.race.allowedBoat = first(boats);
    });
  }

  onSubmit() {
    if (!this.race.id) {
      this.raceService.createRace(this.race).subscribe((race: Race) => {
        this.race = race;
        this.race.allowedBoat = find(this.boats, {id: race.allowedBoat.id});
      });
    }
  }

  setBoat (id) {
    this.race.allowedBoat = find(this.boats, { id });
  }

  ngOnInit() {
    this.loadRaces();
    this.loadBoats();
  }

}
