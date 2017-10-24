import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import {AuthCheckout, Player} from '../../models/player';


@Injectable()
export class MeService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  /**
   * Get identity of the current player
   * @return {Observable<Player>}
   */
  getIdentity(): Observable<Player> {
    return this.httpClient.get<Player>(`/api/me/identity`);
  }

  /**
   * Set the nic of the current player
   * @return {Observable<Player>}
   */
  setNic(nic: string): Observable<Player> {
    return this.httpClient.put<Player>(`/api/me/`, { nic: nic });
  }

  authGoogleCheckout(res: any): Observable<AuthCheckout> {
    return this.httpClient.post<AuthCheckout>(`/api/auth/google/checkout/`, res)
  }

}
