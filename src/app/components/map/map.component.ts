import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';

import {
  MapComponent as YagaMapComponent,
  TileLayerDirective as YagaTileLayerDirective,
  MarkerDirective as YagaMarkerDirective
} from '@yaga/leaflet-ng2';

import { LatLng, LatLngBounds, Point, LeafletEvent } from 'leaflet';


import { BoatMarker } from '../../plugins/boat.plugin';

import { MapService } from '../../services/map/map.service';
import { ConfigService } from '../../services/config/config.service';

import 'leaflet-velocity';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements AfterViewInit {

  private directionValue = 0;

  @Input() position: LatLng;
  @Input() route: LatLng[];
  @Input()
  get direction() {
    return this.directionValue;
  }
  set direction(val) {
    this.directionValue = val;
    this.boatMarker.setRotation(val);
  }

  public topoMapUrl = 'https://b.tile.opentopomap.org/{z}/{x}/{y}.png';
  public zoom = 2;
  public maxBound: LatLngBounds;

  public currentMap;
  public vLayer;

  @ViewChild('mainMap')
  public mainMap: YagaMapComponent;

  @ViewChild('mainLayer')
  public mainLayer: YagaTileLayerDirective;

  // @ViewChild('boatMarker')
  // public boatMarker: YagaMarkerDirective;

  public boatMarker: BoatMarker;

  public maps = this.configService.mapLayers();

  constructor(
    private mapService: MapService,
    private configService: ConfigService,
  ) {
    this. maxBound = new LatLngBounds(new LatLng(-90, -180), new LatLng(90, 180));
    this.currentMap = this.maps[0];
    this.boatMarker = new BoatMarker(
      new LatLng(0, 0),
      0,
    );
  }

  onSelectionChange(map) {
    this.currentMap = map;
  }

  getTiles(event: LeafletEvent): any[] {
    let tiles = [];
    Object.keys(event.target._layers).forEach((key) => {
      if (event.target._layers[key]._tiles) {
        tiles = Object.keys(event.target._layers[key]._tiles);
      }
    });
    return tiles;
  }

  resetWind(event: LeafletEvent) {
    if (this.vLayer) {
      this.vLayer._clearWind();
    }
  }

  ngAfterViewInit() {

    this.mapService.loadMetadata('wind').subscribe((data: any[]) => {
      this.vLayer = L.velocityLayer({
        displayValues: true,
        displayOptions: {
          velocityType: 'GBR Wind',
          displayPosition: 'bottomleft',
          displayEmptyString: 'No wind data'
        },
        data: data,
        maxVelocity: 15,
        minVelocity: 0,
        velocityScale: 0.05
      });
      this.mainMap.addLayer(this.vLayer);
    });

    this.boatMarker.addTo(this.mainMap);

    //this.boatMarker.setRotation(30);
    this.boatMarker.setPosition(new LatLng(0, 0));
  }

}
