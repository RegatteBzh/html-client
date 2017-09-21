import { Component, OnInit } from '@angular/core';
import { Point, LatLng } from 'leaflet';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { SkipperService } from '../../services/skipper/skipper.service';
import { TrigoService } from '../../services/trigo/trigo.service';
import { Skipper } from '../../models/skipper';

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
  ) { }

  private directionStab: Subscription;

  public route: LatLng[] = [];
  public skipper = new Skipper();

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

  getSail(skipper: Skipper): string {
    return skipper.sail.name;
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .switchMap((params: ParamMap) => {
        return this.skipperService.getSkipper(+params.get('id'));
      })
      .subscribe((skipperResp) => {
        this.skipper = skipperResp;
      });

    /*this.route.push(
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
    );*/
  }

}
