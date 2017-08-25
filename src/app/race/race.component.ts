import { Component, OnInit } from '@angular/core';
import { Point, LatLng } from 'leaflet';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { BoatDisplay } from '../models/boatdisplay';
import { RaceService } from './race.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  constructor(
    private raceService: RaceService,
    private activatedRoute: ActivatedRoute
  ) { }

  public boatDisplay = new BoatDisplay(
    '/assets/boats/imoca60/imoca',
    new Point(25, 25),
    new Point(50, 50)
  );

  public route: LatLng[] = [];


  ngOnInit() {
    this.boatDisplay.setPosition(
      new LatLng(51, 7),
      150,
      18
    );

    this.activatedRoute.paramMap
      .switchMap((params: ParamMap) => {
        console.log(params);
        return this.raceService.updateBoatDisplay(+params.get('id'), this.boatDisplay);
      })
      .subscribe();

    this.route.push(
      new LatLng(51, 7)
    );
    this.route.push(
      new LatLng(50, 6)
    );
    this.route.push(
      new LatLng(51, 5)
    );
    this.route.push(
      new LatLng(49, 3)
    );
  }

}
