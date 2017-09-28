import { Component, OnInit } from '@angular/core';
import { Point, LatLng } from 'leaflet';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { find, omit, extend, map } from 'lodash';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { SkipperService } from '../../services/skipper/skipper.service';
import { TrigoService } from '../../services/trigo/trigo.service';
import { BoatService } from '../../services/boat/boat.service';

import { Skipper } from '../../models/skipper';
import { Sail } from '../../models/sail';
import { Waypoint } from '../../models/waypoint';

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
    private router: Router,
  ) { }

  private directionStab: Subscription;

  public route: LatLng[] = [];
  public skipper = new Skipper();
  public availableSails: Sail[];
  public selectedSail: Sail;
  private disablePoller = false;

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

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.skipperService.getSkipper(params.id).subscribe((skipperResp: Skipper) => {
        this.skipper = skipperResp;
        this.boatService.getSails(this.skipper.boat.id).subscribe((sailList: Sail[]) => {
          this.availableSails = sailList;
          this.skipper.sail = find(this.availableSails, { id: this.skipper.sail.id });
          this.selectedSail = this.skipper.sail;
        });


        this.skipperService.getWaypoints(params.id).subscribe((waypoints: Waypoint[]) => {
          this.route = map(waypoints, (waypoint) => waypoint.position);
          this.route.push(this.skipper.position);
        });

        this.startPoller();
      }, () => {
        this.router.navigate(['/dashboard']);
      });

    });

  }

}
