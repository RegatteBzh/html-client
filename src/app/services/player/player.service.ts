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
   * @return {Observable<Player>}
   */
  addFriend(friend: Player): Observable<Player> {
    return this.httpClient.post<Player>(`/api/players/friends/`, { id: friend.id });
  }

  /**
   * remove a friend
   * @param friend Player
   * @return {Observable<Status>}
   */
  removeFriend(friend: Player): Observable<Status> {
    return this.httpClient.delete<Status>(`/api/players/friends/${friend.id}`);
  }

  /**
   * list friends
   * @return {Observable<Player[]>}
   */
  getFriends(): Observable<Player[]> {
    return this.httpClient.get<Player[]>(`/api/players/friends/`);
  }


}
