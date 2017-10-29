import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';

import {
  MapComponent as YagaMapComponent,
  TileLayerDirective as YagaTileLayerDirective,
  MarkerDirective as YagaMarkerDirective,
  PolylineDirective as YagaPolylineDirective,
} from '@yaga/leaflet-ng2';

import { forEach, map, first } from 'lodash';
import { LatLng, LatLngBounds, Point, LeafletEvent, PathOptions, Marker, Icon } from 'leaflet';
import 'leaflet-velocity';

import { BoatMarker } from '../../plugins/boat.plugin';
import { ForecastMarker } from '../../plugins/forecastMarker.plugin';

import { Skipper } from '../../models/skipper';

import { MapService } from '../../services/map/map.service';
import { ConfigService } from '../../services/config/config.service';

import { Wind } from '../../models/wind';

class WindSelect {
  public name: string;
  public index: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements AfterViewInit {

  private directionValue = 0;
  private positionValue = new LatLng(0, 0);
  private vLayer;
  private boatMarker: BoatMarker;
  private forecastMarkers: ForecastMarker[] = null;
  private friendsMarkers: Marker[] = [];

  public zoom = 2;
  public maxBound: LatLngBounds;
  public waypointPolyline: YagaPolylineDirective<GeoJSON.GeometryCollection>;
  public forecastPolyline: YagaPolylineDirective<GeoJSON.GeometryCollection>;
  public currentMap;
  public maps = this.configService.mapLayers();
  public currentWindIndex: WindSelect = new WindSelect();
  public windIndexes: WindSelect[] = [];

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
  get forecast(): LatLng[] {
    return this.forecastPolyline.getLatLngs();
  }
  set forecast(val: LatLng[]) {
    if ((val || []).length) {
      if (!this.forecastMarkers) {
        this.forecastMarkers = map<LatLng, ForecastMarker>(val, (value: LatLng, index) => {
          const marker =  new ForecastMarker(value);
          if (index > 0) {
            marker.addTo(this.mainMap);
          }
          return marker;
        });
      }
      forEach<LatLng, LatLng[]>(val, (value: LatLng, index) => {
        this.forecastMarkers[index].setPosition(value);
      });
      this.forecastPolyline.setLatLngs(val);
      this.forecastPolyline.redraw();
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
  set friends(val: Skipper[]) {
    const friendIcon = new Icon({
        iconUrl: '/assets/markers/friend.png',
        shadowUrl: '/assets/markers/friend-shadow.png',
        iconSize:     [20, 31], // size of the icon
        shadowSize:   [15, 32], // size of the shadow
        iconAnchor:   [10, 31], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 32],  // the same for the shadow
        popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
    });
    forEach<Marker, Marker[]>(this.friendsMarkers, (markerElt: Marker) => {
      this.mainMap.removeLayer(markerElt);
    });
    this.friendsMarkers = map<Skipper, Marker>(val, (skipper) => {
      const name = skipper.player.nic || skipper.player.name;
      return  new Marker([skipper.position.lat, skipper.position.lng], {icon: friendIcon})
      .bindPopup(`${name}(${skipper.speed})`).addTo(this.mainMap);
    });
  }

  @Input()
  get direction() {
    return this.directionValue;
  }
  set direction(val) {
    this.directionValue = val;
    this.boatMarker.setRotation(val);
  }


  @ViewChild('mainMap')
  public mainMap: YagaMapComponent;

  @ViewChild('mainLayer')
  public mainLayer: YagaTileLayerDirective;


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

  loadWindMap() {
    this.mapService.loadCurrentWind().subscribe((data: any[]) => {
      this.setWindMap();
    });
  }

  setWindMap(index?: number) {
    index = index || 0;
    if (this.vLayer) {
      this.mainMap.removeLayer(this.vLayer);
    }
    this.vLayer = L.velocityLayer({
      /*displayValues: true,
      displayOptions: {
        velocityType: 'GBR Wind',
        displayPosition: 'bottomleft',
        displayEmptyString: 'No wind data'
      },*/
      data: this.mapService.getForecastWind(index).data,
      maxVelocity: 15,
      minVelocity: 0,
      velocityScale: 0.01
    });
    this.mainMap.addLayer(this.vLayer);
  }

  selectWind(event: WindSelect) {
    this.setWindMap(event.index);
  }

  setBoatMarker() {
    this.boatMarker.addTo(this.mainMap);
  }

  ngAfterViewInit() {

    this.waypointPolyline = new YagaPolylineDirective<GeoJSON.GeometryCollection>(this.mainMap);
    this.forecastPolyline = new YagaPolylineDirective<GeoJSON.GeometryCollection>(this.mainMap);

    this.forecastPolyline.setStyle({
      color: '#00ff00',
      lineJoin: 'round',
      dashArray: '6'
    });

    this.loadWindMap();
    this.setBoatMarker();
    this.mapService.loadForecastWinds().subscribe((winds: Wind[]) => {
      this.windIndexes = map<Wind, WindSelect>(winds, (wind: Wind, index: number) => {
        const w = new WindSelect();
        const hour = this.mapService.forecastOptions.stepHour * index;
        w.index = index;
        w.name = `${hour} H`;
        return w;
      });
      this.currentWindIndex = first(this.windIndexes);
    });

  }

}
