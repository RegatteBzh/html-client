import { Component, OnInit } from '@angular/core';
import { Point, LatLng } from 'leaflet';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { find, omit, extend, map, forEach } from 'lodash';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { SkipperService } from '../../services/skipper/skipper.service';
import { TrigoService } from '../../services/trigo/trigo.service';
import { BoatService } from '../../services/boat/boat.service';
import { PolarService } from '../../services/polar/polar.service';

import { Skipper } from '../../models/skipper';
import { Sail } from '../../models/sail';
import { Waypoint } from '../../models/waypoint';
import { Polar } from '../../models/polar';

@Component({
  selector: 'app-skipper',
  templateUrl: './skipper.component.html',
  styleUrls: ['./skipper.component.less']
})
export class SkipperComponent implements OnInit {

  constructor(
    private skipperService: SkipperService,
    private activatedRoute: ActivatedRoute,
    private trigoService: TrigoService,
    private boatService: BoatService,
    private polarService: PolarService,
    private router: Router,
  ) { }

  private directionStab: Subscription;

  public waypoints: LatLng[] = [];
  public skipper = new Skipper();
  public availableSails: Sail[];
  public selectedSail: Sail;
  private disablePoller = false;
  private currentPolar: Polar;

  public poller: Observable<number>;

  changeDirection(event) {
    if (this.directionStab) {
      this.directionStab.unsubscribe();
    }
    this.skipper.windAngle = -1;
    this.directionStab = Observable.timer(1000).subscribe(() => {
        this.disablePoller = true;
        this.skipperService.setSkipperDirection(this.skipper.id, event).subscribe((skipperResp: Skipper) => {
          extend(this.skipper, omit(skipperResp, ['sail']));
        }, () => {}, () => {
          this.disablePoller = false;
        });
    });
  }

  getSpeed(skipper: Skipper): number {
    return this.trigoService.meterToKnot(skipper.speed);
  }

  getWindSpeed(skipper: Skipper): number {
    return this.trigoService.meterToKnot(skipper.windSpeed);
  }

  selectSail(sail) {
    this.disablePoller = true;
    this.skipperService.setSkipperSail(this.skipper.id, this.selectedSail.id).subscribe((skipperResp: Skipper) => {
        extend(this.skipper, skipperResp);
        this.loadPolars();
      }, () => {
      this.selectedSail = this.skipper.sail;
    }, () => {
      this.disablePoller = false;
    });
  }

  startPoller () {
    this.poller = Observable.timer(5000, 5000);
    this.poller.subscribe(() => {
      this.skipperService.getSkipper(this.skipper.id).subscribe((skipperResp: Skipper) => {
        extend(this.skipper, omit(skipperResp, ['sail']));
      });
    });
  }

  getSails(boatId: string) {
    this.boatService.getSails(boatId).subscribe((sailList: Sail[]) => {
      this.availableSails = sailList;
      this.skipper.sail = find(this.availableSails, { id: this.skipper.sail.id });
      this.selectedSail = this.skipper.sail;
    });
  }

  getWaypoints(skipper: Skipper) {
    this.skipperService.getWaypoints(skipper.id).subscribe((waypoints: Waypoint[]) => {
      const way: LatLng[] = [];
      forEach(waypoints, (waypoint) => {
        way.push(waypoint.position);
      });
      way.push(skipper.position);
      this.waypoints = way;
    });
  }

  loadPolars() {
    this.polarService.getPolars(this.skipper.sail.id).subscribe((polar: Polar) => {
      this.currentPolar = polar;
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.skipperService.getSkipper(params.id).subscribe((skipperResp: Skipper) => {
        this.skipper = skipperResp;
        this.getSails(this.skipper.boat.id);
        this.getWaypoints(this.skipper);
        this.loadPolars();
        this.startPoller();
      }, () => {
        this.router.navigate(['/dashboard']);
      });

    });

  }

}
