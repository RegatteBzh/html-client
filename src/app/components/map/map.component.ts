import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';

import {
  MapComponent as YagaMapComponent,
  TileLayerDirective as YagaTileLayerDirective,
  MarkerDirective as YagaMarkerDirective,
  PolylineDirective as YagaPolylineDirective,
} from '@yaga/leaflet-ng2';

import { forEach } from 'lodash';

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
  private positionValue = new LatLng(0, 0);

  @Input()
  get waypoints(): LatLng[] {
    return this.waypointPolyline.getLatLngs();
  }
  set waypoints(val: LatLng[]) {
    if ((val || []).length) {
      this.waypointPolyline.setLatLngs(val);
      this.waypointPolyline.redraw();
    }
  }

  @Input()
  get position(): LatLng {
    return this.positionValue;
  }
  set position(val: LatLng) {
    this.positionValue = val;
    this.boatMarker.setPosition(val);
  }

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
  public waypointPolyline: YagaPolylineDirective<GeoJSON.GeometryCollection>;

  public currentMap;
  public vLayer;

  @ViewChild('mainMap')
  public mainMap: YagaMapComponent;

  @ViewChild('mainLayer')
  public mainLayer: YagaTileLayerDirective;

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

    this.waypointPolyline = new YagaPolylineDirective<GeoJSON.GeometryCollection>(this.mainMap);

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

  }

}
