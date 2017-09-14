import { Component, OnInit } from '@angular/core';
import { Point, LatLng } from 'leaflet';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { BoatDisplay } from '../../models/boatdisplay';
import { SkipperService } from '../../services/skipper/skipper.service';

@Component({
  selector: 'app-skipper',
  templateUrl: './skipper.component.html',
  styleUrls: ['./skipper.component.less']
})
export class SkipperComponent implements OnInit {

  constructor(
    private skipperService: SkipperService,
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
        return this.skipperService.updateBoatDisplay(+params.get('id'), this.boatDisplay);
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
