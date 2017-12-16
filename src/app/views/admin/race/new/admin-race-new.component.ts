import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { AutoUnsubscribe } from '../../../../decorators/autoUnsubscribe';
import { BoatService } from '../../../../services/boat/boat.service';
import { RaceService } from '../../../../services/race/race.service';
import { find, omit, extend, map, forEach } from 'lodash';

import { Boat } from '../../../../models/boat';
import { Race } from '../../../../models/race';

import { Marker, Icon } from 'leaflet';

import {
  MapComponent as YagaMapComponent,
  TileLayerDirective as YagaTileLayerDirective,
  MarkerDirective as YagaMarkerDirective,
  PolylineDirective as YagaPolylineDirective,
} from '@yaga/leaflet-ng2';

import {
  LatLng,
  LatLngBounds,
  Point
} from 'leaflet';

@AutoUnsubscribe()
@Component({
  selector: 'app-admin-race-new',
  templateUrl: './admin-race-new.component.html',
  styleUrls: ['./admin-race-new.component.less']
})
export class AdminRaceNewComponent implements OnInit {


  @ViewChild('mainMap')
  public mainMap: YagaMapComponent;

  @ViewChild('mainLayer')
  public mainLayer: YagaTileLayerDirective;

  public tileUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  public zoom = 2;

  // Creation form
  public boats: Boat[] = [];
  private startMarker: Marker = null;
  private finishMarker: Marker = null;
  public finishMarkerSelected = false;
  public saving = false;
  public race: Race = new Race();
  public maxBound: LatLngBounds;

  constructor(
    private boatService: BoatService,
    private raceService: RaceService,
  ) {
    this. maxBound = new LatLngBounds(new LatLng(-90, -180), new LatLng(90, 180));
  }

  /**
   * Select a point on the map
   * @param event Map event
   */
  pointSelected (event: any) {
    if (event.latlng) {
      if (this.finishMarkerSelected) {
        this.finishMarker.setLatLng(event.latlng);
        this.race.end = new LatLng(event.latlng.lat, event.latlng.lng);
      } else {
        this.startMarker.setLatLng(event.latlng);
        this.race.start = new LatLng(event.latlng.lat, event.latlng.lng);
      }
    }
  }

  /**
   * Load all boats
   */
  loadBoats () {
    this.boatService.getBoats().subscribe((boats: Boat[]) => {
      this.boats = boats;
    });
  }

  /**
   * Save the race
   */
  saveRace () {
    if (this.race.id) {
      return;
    }
    this.saving = true;
    this.raceService.createRace(this.race).subscribe((race: Race) => {
      this.saving = false;
      this.race = race;
    });
  }

  /**
   * Create Start and finish markers
   */
  createMarkers () {
    this.finishMarker = new Marker(
      [0, 0],
      {
        icon: new Icon({
          iconUrl: '/assets/markers/finish.png',
          shadowUrl: '/assets/markers/finish-shadow.png',
          iconSize:     [64, 64], // size of the icon
          shadowSize:   [62, 38], // size of the shadow
          iconAnchor:   [23, 60], // point of the icon which will correspond to marker's location
          shadowAnchor: [2, 35]  // the same for the shadow
        })
      }
    ).addTo(this.mainMap);

    this.startMarker = new Marker(
      [5, 5],
      {
        icon: new Icon({
          iconUrl: '/assets/markers/friend.png',
          shadowUrl: '/assets/markers/friend-shadow.png',
          iconSize:     [20, 31], // size of the icon
          shadowSize:   [15, 32], // size of the shadow
          iconAnchor:   [10, 31], // point of the icon which will correspond to marker's location
          shadowAnchor: [0, 32],  // the same for the shadow
          popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
      })
      }
    ).addTo(this.mainMap);
  }

  ngOnInit() {
    this.loadBoats();
    this.createMarkers();
    this.race.endRayKm = 10;

  }

}
