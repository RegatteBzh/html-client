import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Player } from '../../models/player';
import { Status } from '../../models/status';

@Injectable()
export class PlayerService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  /**
   * Search player
   * @return {Observable<Player[]>}
   */
  search(query: string): Observable<Player[]> {
    return this.httpClient.get<Player[]>(`/api/players/list/${query}`);
  }

  /**
   * Add a friend
   * @param friend Player
   * @return {Observable<Status>}
   */
  addFriend(friend: Player): Observable<Status> {
    return this.httpClient.post<Status>(`/api/players/friend`, { id: friend.id });
  }

  /**
   * list friends
   * @return {Observable<Status>}
   */
  getFriends(): Observable<Player[]> {
    return this.httpClient.get<Player[]>(`/api/players/friend`);
  }


}
