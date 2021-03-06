import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LatLng } from 'leaflet';
import { first } from 'lodash';

import { environment } from '../../../environments/environment';
import { WindAxis, Wind } from '../../models/wind';
import { Polar } from '../../models/polar';

import { TrigoService } from '../trigo/trigo.service';
import { WindSpeed } from '../../models/wind';
import { Forecast } from '../../models/forecast';

@Injectable()
export class MapService {

  constructor(
    private httpClient: HttpClient,
    private trigoService: TrigoService,
  ) { }

  public winds: Wind[] = [];
  public forecastOptions = {
    stepHour: 6,
    steps: 4
  };

  get currentWind () {
    return first(this.winds) || new Wind();
  }

  set currentWind (wind: Wind) {
    this.winds[0] = wind;
  }

  getForecastWind(index?: number): Wind {
    index = index || 0;
    index = index < 0 ? 0 : index;

    if (!this.winds[index] && index > 0) {
      return this.getForecastWind(index - 1);
    }

    return this.winds[index];
  }

  loadCurrentWind(): Observable<WindAxis[]> {
    return Observable.create(observer => {
      this.httpClient.get<WindAxis[]>(`/assets/winds/1.0/wind000.json`).subscribe((data: WindAxis[]) => {
        this.currentWind = new Wind(data);
        observer.next(this.currentWind.data);
      });
    });
  }

  loadForecastWinds (index?: number, observer?): Observable<Wind[]> {
    index = index || 1;
    if (!observer) {
      return Observable.create(obs => {
        this.loadForecastWinds(index, obs);
      });
    }

    if (index >= this.forecastOptions.steps) {
      observer.next(this.winds);
    } else {
      const indexStr = `000${index * this.forecastOptions.stepHour}`.slice(-3);

      this.httpClient.get<WindAxis[]>(`/assets/winds/1.0/wind${indexStr}.json`).subscribe((data: WindAxis[]) => {
        this.winds[index] = new Wind(data);
        this.loadForecastWinds (index + 1, observer);
      });
    }
  }

  getWindAt(position: LatLng, index?: number): WindSpeed {
    index = index || 0;
    const value = this.getForecastWind(index).getWindAt(position);
    if (value.length !== 2) {
      return new WindSpeed();
    }
    return new WindSpeed(
      this.trigoService.meterPerSecondToKnot(value[0]),
      this.trigoService.meterPerSecondToKnot(value[1])
    );
  }

  getRelativeAngle(boat: number, wind: number): number {
    const angle = (wind - boat + 360) % 360;
    if (angle < 180) {
      return 180 - angle;
    }
    return angle - 180;
  }

  forecastRoute(position: LatLng, bearingDegree: number, polar: Polar, options?: any): Forecast {
      options = options || {};
      const result = new Forecast();
      result.way.push(position);
      for (let i = 0; i < this.forecastOptions.steps; i++) {
        const lastPos = result.getLastPosition();
        const windSpeedKnot = this.getWindAt(lastPos, i);

        const relativeWindBearing = this.getRelativeAngle(bearingDegree, windSpeedKnot.bearing);

        const speedKnot = windSpeedKnot.value * polar.getSpeedCoefAt(windSpeedKnot.value, relativeWindBearing);
        const distanceKm = this.trigoService.knotToMeterPerSecond(speedKnot) * 3.6 * this.forecastOptions.stepHour;
        result.speed.push(speedKnot);
        result.way.push(this.trigoService.pointAtDistanceAndBearing(lastPos, distanceKm, bearingDegree));
        result.windRelativeBearings.push(relativeWindBearing);
        result.windBearing.push(windSpeedKnot.bearing);
        result.windSpeedKnot.push(windSpeedKnot.value);
        result.distanceKm.push(distanceKm);
      }
      return result;
  }

}
