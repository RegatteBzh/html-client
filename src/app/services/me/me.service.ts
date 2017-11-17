import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Player } from '../../models/player';


@Injectable()
export class MeService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public identity: Player = new Player();


  /**
   * Get identity of the current player
   * @return {Observable<Player>}
   */
  getIdentity(): Observable<Player> {
    return Observable.create(observer => {
      this.httpClient.get<Player>(`/api/me/identity`).subscribe((me: Player) => {
        this.identity = me;
        observer.next(me);
      });
    });
  }

  /**
   * Set the nic of the current player
   * @return {Observable<Player>}
   */
  setNic(nic: string): Observable<Player> {
    return this.httpClient.put<Player>(`/api/me/`, { nic: nic });
  }

}
