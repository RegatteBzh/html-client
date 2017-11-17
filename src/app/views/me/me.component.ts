import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { MeService } from '../../services/me/me.service';
import { PlayerService } from '../../services/player/player.service';
import { Player } from '../../models/player';

import { remove, map, filter, find } from 'lodash';

interface IOption {
  id: string;
  name: string;
  nic: string;
}

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.less']
})
export class MeComponent implements OnInit {

  public me: Player = new Player();
  public saving: boolean;
  public selectedFriend: Player = new Player();
  public friends: Player[] = [];
  private typingFriend: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private meService: MeService,
    private playerService: PlayerService,
  ) {

  }

  public refreshFriendSearch = async (query: string) => {
    return new Promise<IOption[]>(resolve => {
      if ((query || '').length > 0) {
        if (this.typingFriend) {
          this.typingFriend.unsubscribe();
        }
        this.typingFriend = Observable.timer(700).subscribe(() => {
          this.playerService.search(query).subscribe((players: Player[]) => {
            const options: IOption[] = map<Player, IOption>(
              filter(players, (player) => !find(this.friends, { id: player.id })),
              (player: Player) => ({
                name: player.name,
                id: player.id,
                nic: player.nic,
              })
            );
            resolve(options);
          });
        });
      } else {
        resolve([]);
      }
    });
  }

  saveUser() {
    this.saving = true;
    this.meService.setNic(this.me.nic).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  addFriend(friend: Player) {
    this.playerService.addFriend(friend).subscribe((friendElt: Player) => {
      this.friends.push(friendElt);
      this.selectedFriend = new Player();
    });
  }

  deleteFriend(friend: Player) {
    this.playerService.removeFriend(friend).subscribe(() => {
      remove(this.friends, { id: friend.id });
    });
  }

  listFriends() {
    this.playerService.getFriends().subscribe((friends: Player[]) => {
      this.friends = friends;
    });
  }

  getIdentity() {
    this.meService.getIdentity().subscribe((player: Player) => {
      this.me = player;
    });
  }

  ngOnInit() {
    this.getIdentity();
    this.listFriends();
  }

}
