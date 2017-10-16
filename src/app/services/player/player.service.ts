import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Player } from '../../models/player';


@Injectable()
export class PlayerService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  /**
   * Search player
   * @return {Observable<Player[]>}
   */
  Search(query: string): Observable<Player[]> {
    return this.httpClient.get<Player[]>(`/api/player/${query}`);
  }


}
