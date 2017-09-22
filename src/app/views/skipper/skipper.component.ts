import { Component, OnInit } from '@angular/core';
import { Point, LatLng } from 'leaflet';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { find } from 'lodash';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { SkipperService } from '../../services/skipper/skipper.service';
import { TrigoService } from '../../services/trigo/trigo.service';
import { BoatService } from '../../services/boat/boat.service';

import { Skipper } from '../../models/skipper';
import { Sail } from '../../models/sail';

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
  ) { }

  private directionStab: Subscription;

  public route: LatLng[] = [];
  public skipper = new Skipper();
  public availableSails: Sail[];
  public selectedSail: Sail;

  changeDirection(event) {
    if (this.directionStab) {
      this.directionStab.unsubscribe();
    }
    this.directionStab = Observable.timer(1000).subscribe(() => {
        console.log('Save direction');
        this.skipperService.setSkipperDirection(this.skipper.id, event).subscribe((bearingResp) => {
          console.log(bearingResp);
        });
    });
  }

  getSpeed(skipper: Skipper): number {
    return this.trigoService.meterToKnot(skipper.speed);
  }

  selectSail(sail) {
    this.skipperService.setSkipperSail(this.skipper.id, this.selectedSail.id).subscribe((sailResp) => {
      console.log(sailResp);
      this.skipper.sail = sail;
    }, () => {
      this.selectedSail = this.skipper.sail;
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.skipperService.getSkipper(+params.id).subscribe((skipperResp: Skipper) => {
        this.skipper = skipperResp;
        this.boatService.getSails(this.skipper.boat.id).subscribe((sailList: Sail[]) => {
          this.availableSails = sailList;
          this.skipper.sail = find(this.availableSails, { id: this.skipper.sail.id });
          this.selectedSail = this.skipper.sail;
        });
      });
    });

  //   /*this.route.push(
  //     new LatLng(51, 7)
  //   );
  //   this.route.push(
  //     new LatLng(50, 6)
  //   );
  //   this.route.push(
  //     new LatLng(51, 5)
  //   );
  //   this.route.push(
  //     new LatLng(49, 3)
  //   );*/
  }

}
