import { Component, OnInit, Input } from '@angular/core';

import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { latLng, LatLng, LatLngBounds, Point } from 'leaflet';
import { Boat } from '../models/boat';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() boat: Boat;
  @Input() route: LatLng[];

  public basicMapUrl: string = OSM_TILE_LAYER_URL;
  public topoMapUrl = 'https://b.tile.opentopomap.org/{z}/{x}/{y}.png';
  public zoom = 2;
  public maxBound: LatLngBounds;

  public maps = [
    {
      name: 'topo',
      url: 'https://b.tile.opentopomap.org/{z}/{x}/{y}.png',
      opacity: 0,
      selected: true
    },
    {
      name: 'basic',
      url: 'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
      opacity: 0
    },
    {
      name: 'etopo',
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
      opacity: 1
    }
  ];

  constructor() {
    this. maxBound = new LatLngBounds(new LatLng(-90, -180), new LatLng(90, 180));
  }

  ngOnInit() {
  }

}
