import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { AutoUnsubscribe } from '../../../decorators/autoUnsubscribe';
import { ShapeService } from '../../../services/shape/shape.service';
import { Shape } from '../../../models/shape';
import { find, omit, extend, map, forEach } from 'lodash';

import {
  MapComponent as YagaMapComponent,
  TileLayerDirective as YagaTileLayerDirective,
  PolylineDirective as YagaPolylineDirective,
} from '@yaga/leaflet-ng2';

import {
  LatLng,
  LatLngBounds,
  Point
} from 'leaflet';

@AutoUnsubscribe()
@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.less']
})
export class AdminOverviewComponent implements OnInit {

  @ViewChild('mainMap')
  public mainMap: YagaMapComponent;

  @ViewChild('mainLayer')
  public mainLayer: YagaTileLayerDirective;

  public tileUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  public zoom = 2;
  public maxBound: LatLngBounds;
  public shapes: Shape[] = [];
  public currentPoint: LatLng = new LatLng(0, 0);

  constructor(
    private shapeService: ShapeService,
  ) {
    this. maxBound = new LatLngBounds(new LatLng(-90, -180), new LatLng(90, 180));
  }

   /**
   * Select a point on the map
   * @param event Map event
   */
  pointSelected (event: any) {
    if (event.latlng) {
      this.currentPoint = new LatLng(event.latlng.lat, event.latlng.lng);
      console.log(this.currentPoint);
    }
  }

  ngOnInit() {
    this.shapeService.getShapes().subscribe((shapes: Shape[]) => {
      this.shapes = shapes;
      forEach(shapes, (shape, index) => {
        const shapePolyline = new YagaPolylineDirective<GeoJSON.GeometryCollection>(this.mainMap);
        const points = map<any, LatLng>(shape.points, (pt) => {
          return new LatLng(pt.lat, pt.lng);
        });
        points.push(points[0]);
        if (!index) {
          shapePolyline.setStyle({
            color: '#ff0000',
          });
        }
        shapePolyline.setLatLngs(points);
        shapePolyline.redraw();
      });
    });

  }

}
