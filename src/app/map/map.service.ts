import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

import { ConfigService } from '../config.service';

@Injectable()
export class MapService {

  constructor(
    private http: Http,
    private configService: ConfigService,
  ) { }


  loadMetaTiles(tiles: String[], type: String, data: any) {
    console.log(tiles);
  }

}
