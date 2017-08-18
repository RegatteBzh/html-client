import { Component, OnInit } from '@angular/core';
import { Point, LatLng } from 'leaflet';
import { Boat } from '../models/boat';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  constructor() { }

  public boat = new Boat(
    '/assets/boats/imoca60/imoca',
    new Point(25, 25),
    new Point(50, 50)
  );

  public route: LatLng[] = [];


  ngOnInit() {
    this.boat.setPosition(
      new LatLng(51, 7),
      150,
      18
    );

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
