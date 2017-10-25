import { Component, OnInit } from '@angular/core';
import { LatLng } from 'leaflet';

import { find, omit, extend, forEach } from 'lodash';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { BoatService } from '../../services/boat/boat.service';
import { PolarService } from '../../services/polar/polar.service';
import { MapService } from '../../services/map/map.service';
import { SkipperService } from '../../services/skipper/skipper.service';

import { Polar } from '../../models/polar';
import { Sail } from '../../models/sail';
import { Skipper } from '../../models/skipper';
import { Waypoint } from '../../models/waypoint';
import { Forecast } from '../../models/forecast';
import {IonicPage, NavController, NavParams} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'app-skipper',
  templateUrl: './skipper.component.html'
})
export class SkipperPage implements OnInit {

  constructor(
    private boatService: BoatService,
    private skipperService: SkipperService,
    private mapService: MapService,
    private polarService: PolarService,
    private navParams: NavParams,
    private navCtrl: NavController
  ) { }

  private currentPolar: Polar;
  private directionStab: Subscription;
  private disablePoller = false;
  private poller: Subscription;
  private pollerError = 0;
  private compasBusy = false;

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
    this.skipper.windRelativeAngle = -1;
    this.skipper.speed = -1;
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

  startPoller() {
    this.poller = Observable.timer(5000, 5000).subscribe(() => {
      if (!this.compasBusy) {
        this.forecastRoute();
        this.skipperService.getSkipper(this.skipper.id).subscribe((skipperResp: Skipper) => {
          this.pollerError = 0;
          extend(this.skipper, omit(skipperResp, ['sail']));
        }, () => {
          if (this.pollerError++ > 2) {
            this.poller.unsubscribe();
          }
        });
      }
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

  forecastRoute() {
    this.forecast = this.mapService.forecastRoute(this.skipper.position, this.skipper.direction, this.currentPolar);
  }

  displayForecast() {
    return JSON.stringify(this.forecast, null, 4);
  }

  ngOnInit() {
    let skipperID = this.navParams.get('id');
    this.skipperService.getSkipper(skipperID).subscribe((skipperResp: Skipper) => {
      this.skipper = skipperResp;
      this.getSails(this.skipper.boat.id);
      this.getWaypoints(this.skipper);
      this.getSkipperFriends(this.skipper);
      this.loadPolars();
      this.startPoller();
    }, () => {
      this.navCtrl.push('DashboardPage');
    });

  }

}
