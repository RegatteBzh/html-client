import { Component, OnInit, OnDestroy } from '@angular/core';
import { Point, LatLng } from 'leaflet';
import { ActivatedRoute, ParamMap, Router, Event } from '@angular/router';

import { AutoUnsubscribe } from '../../decorators/autoUnsubscribe';

import { find, omit, extend, map, forEach } from 'lodash';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { BoatService } from '../../services/boat/boat.service';
import { PolarService } from '../../services/polar/polar.service';
import { MapService } from '../../services/map/map.service';
import { SkipperService } from '../../services/skipper/skipper.service';
import { TrigoService } from '../../services/trigo/trigo.service';

import { Polar } from '../../models/polar';
import { Sail } from '../../models/sail';
import { Skipper } from '../../models/skipper';
import { Waypoint } from '../../models/waypoint';
import { Forecast } from '../../models/forecast';

@AutoUnsubscribe()
@Component({
  selector: 'app-skipper',
  templateUrl: './skipper.component.html',
  styleUrls: ['./skipper.component.less']
})
export class SkipperComponent implements OnInit, OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    private boatService: BoatService,
    private skipperService: SkipperService,
    private mapService: MapService,
    private polarService: PolarService,
    private router: Router,
    private trigoService: TrigoService,
  ) { }

  private currentPolar: Polar;
  private directionStab: Subscription;
  private disablePoller = false;
  private skipperPoller: Subscription;
  private friendsPoller: Subscription;
  private skipperPollerError = 0;
  private friendsPollerError = 0;
  private compasBusy = false;
  private UnfailLaunched = false;

  public invalidValue = -1000;
  public availableSails: Sail[];
  public forecast = new Forecast();
  public selectedSail: Sail;
  public skipper = new Skipper();
  public waypoints: LatLng[] = [];
  public skipperFriends: Skipper[] = [];

  changeDirection(event) {
    if (this.directionStab) {
      this.directionStab.unsubscribe();
    }
    this.skipper.windRelativeAngle = this.invalidValue;
    this.skipper.speed = this.invalidValue;
    this.forecastRoute();
    this.directionStab = Observable.timer(1000).subscribe(() => {
      this.disablePoller = true;
      this.skipperService.setSkipperDirection(this.skipper.id, event).subscribe((skipperResp: Skipper) => {
        extend(this.skipper, omit(skipperResp, ['sail']));
      }, () => { }, () => {
        this.disablePoller = false;
      });
    });
  }

  isRaceInFuture(): boolean {
    return this.skipper.race.dateStart &&
    this.skipper.race.dateStart.getTime &&
    this.skipper.race.dateStart.getTime() > new Date().getTime();
  }

  selectSail(sail) {
    this.disablePoller = true;
    this.skipperService.setSkipperSail(this.skipper.id, this.selectedSail.id).subscribe((skipperResp: Skipper) => {
      extend(this.skipper, skipperResp);
      this.loadPolars().then((polar) => {
        this.forecastRoute();
        return polar;
      });
    }, () => {
      this.selectedSail = this.skipper.sail;
    }, () => {
      this.disablePoller = false;
    });
  }

  SetCompasBusy (event) {
    this.compasBusy = event;
  }

  startSkipperPoller() {
    this.skipperPoller = Observable.timer(5000, 5000).subscribe(() => {
      if (!this.compasBusy) {
        this.forecastRoute();
        this.skipperService.getSkipper(this.skipper.id).subscribe((skipperResp: Skipper) => {
          this.skipperPollerError = 0;
          extend(this.skipper, omit(skipperResp, ['sail']));
        }, () => {
          if (this.skipperPollerError++ > 2) {
            this.skipperPoller.unsubscribe();
          }
        });
      }
    });
  }

  startFriendsPoller() {
    this.friendsPoller = Observable.timer(30000, 30000).subscribe(() => {
        this.getSkipperFriends(this.skipper);
    });
  }

  getSails(boatId: string) {
    this.boatService.getSails(boatId).subscribe((sailList: Sail[]) => {
      forEach(sailList, (sail) => {
        sail.name = 'sail.' + sail.name.replace(/-/g, '.');
      });
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

  loadPolars(): Promise<Polar> {
    return new Promise((resolve, reject) => {
      this.polarService.getPolars(this.skipper.sail.id).subscribe((polar: Polar) => {
        this.currentPolar = polar;
        resolve(polar);
      }, (err) => {
        reject(err);
      });
    });
  }

  getSkipperFriends(skipper: Skipper) {
    this.skipperService.getSkipperFriends(skipper.id).subscribe((skippers: Skipper[]) => {
      this.skipperFriends = skippers;
    });
  }

  changeSailDown() {
    this.skipperService.setSailDown(this.skipper.id, this.skipper.sailDown).subscribe(() => {}, () => {
      this.skipper.sailDown = !this.skipper.sailDown;
    });
  }

  forecastRoute() {
    this.forecast = this.mapService.forecastRoute(this.skipper.position, this.skipper.direction, this.currentPolar);
  }

  displayForecast() {
    return JSON.stringify(this.forecast, null, 4);
  }

  unfailBoat() {
    this.skipperService.unfail(this.skipper.id).subscribe(() => {
      this.UnfailLaunched = true;
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const skipperID = params.id;
      this.skipperService.getSkipper(skipperID).subscribe((skipperResp: Skipper) => {
        this.skipper = skipperResp;
        this.getSails(this.skipper.boat.id);
        this.getWaypoints(this.skipper);
        this.getSkipperFriends(this.skipper);
        this.loadPolars();
        this.startSkipperPoller();
        this.startFriendsPoller();
      }, () => {
        this.router.navigate(['/dashboard']);
      });

    });


  }

  ngOnDestroy(): void {
    if (this.skipperPoller) {
      this.skipperPoller.unsubscribe();
    }
    if (this.friendsPoller) {
      this.friendsPoller.unsubscribe();
    }
  }

}
