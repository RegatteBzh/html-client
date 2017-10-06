import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LatLng } from 'leaflet';

import { environment } from '../../../environments/environment';
import { WindAxis, Wind } from '../../models/wind';
import { Polar } from '../../models/polar';

import { TrigoService } from '../trigo/trigo.service';
import { WindSpeed } from '../../models/wind';

@Injectable()
export class MapService {

  constructor(
    private httpClient: HttpClient,
    private trigoService: TrigoService,
  ) { }

  public currentWind: Wind;


  loadMetadata(type: String): Observable<WindAxis[]> {
    return Observable.create(observer => {
      this.httpClient.get<WindAxis[]>(`/assets/winds/wind000.json`).subscribe((data: WindAxis[]) => {
        this.currentWind = new Wind(data);
        observer.next(this.currentWind.data);
      });
    });
  }

  getWindAt(position: LatLng): WindSpeed {
    const value = this.currentWind.getWindAt(position);
    if (value.length !== 2) {
      return new WindSpeed();
    }
    return new WindSpeed(
      this.trigoService.meterToKnot(value[0]),
      this.trigoService.meterToKnot(value[1])
    );
  }

  forecastRoute(position: LatLng, bearingDegree: number, polar: Polar): LatLng[] {
      const result: LatLng[] = [];
      result.push(position);
      for (let i = 0; i < 4; i++) {
        const lastPos = result[result.length - 1];
        const windSpeed = this.getWindAt(lastPos);
        const relativeWindBearing =  180 - (Math.abs(bearingDegree - windSpeed.bearing) % 180);
        const speed = polar.getSpeedAt(windSpeed.value, relativeWindBearing);
        const distance = speed * 3.6 * 6;
        result.push(this.trigoService.pointAtDistanceAndBearing(lastPos, distance, bearingDegree));
      }
      return result;
  }

}
