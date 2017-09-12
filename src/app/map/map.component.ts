import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';

import { MapComponent as YagaMapComponent, TileLayerDirective as YagaTileLayerDirective } from '@yaga/leaflet-ng2';
import { LatLng, LatLngBounds, Point, Event } from 'leaflet';
import { BoatDisplay } from '../models/boatdisplay';

import { MapService } from './map.service';
import { ConfigService } from '../services/config/config.service';

import 'leaflet-velocity';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements AfterViewInit {

  @Input() boatDisplay: BoatDisplay;
  @Input() route: LatLng[];

  public topoMapUrl = 'https://b.tile.opentopomap.org/{z}/{x}/{y}.png';
  public zoom = 2;
  public maxBound: LatLngBounds;

  public currentMap;
  public vLayer;

  @ViewChild('mainMap')
  public mainMap: YagaMapComponent;

  @ViewChild('mainLayer')
  public mainLayer: YagaTileLayerDirective;

  public maps = this.configService.mapLayers();

  constructor(
    private mapService: MapService,
    private configService: ConfigService,
  ) {
    this. maxBound = new LatLngBounds(new LatLng(-90, -180), new LatLng(90, 180));
    this.currentMap = this.maps[0];
  }

  onSelectionChange(map) {
    this.currentMap = map;
  }

  getTiles(event: Event): any[] {
    let tiles = [];
    Object.keys(event.target._layers).forEach((key) => {
      if (event.target._layers[key]._tiles) {
        tiles = Object.keys(event.target._layers[key]._tiles);
      }
    });
    return tiles;
  }

  resetWind(event: Event) {
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
        maxVelocity: 0.6,
        velocityScale: 0.10
      });
      this.mainMap.addLayer(this.vLayer);
    });
  }

}
