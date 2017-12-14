import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { AutoUnsubscribe } from '../../../decorators/autoUnsubscribe';
import { find, omit, extend, map, forEach } from 'lodash';

import { PlayerService } from '../../../services/player/player.service';
import { Player } from '../../../models/player';
import { Skipper } from '../../../models/skipper';
import { Paginate } from '../../../models/paginate';


@AutoUnsubscribe()
@Component({
  selector: 'app-admin-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {

  public players: Paginate<Player> = new Paginate<Player>();
  public currentPlayer: Player = new Player();
  public currentSkippers: Skipper[] = [];

  constructor(
    private playerService: PlayerService,
  ) {

  }

  getPlayers(page = 0) {
    this.playerService.getPlayers(page).subscribe((data: Paginate<Player>) => {
      this.players = data;
      console.log(data);
    });
  }

  nextPage() {
    this.getPlayers(this.players.page + 1);
  }

  previousPage() {
    this.getPlayers(this.players.page - 1);
  }

  loadDetails (player: Player) {
    this.playerService.getSkippers(player.id).subscribe((skippers: Skipper[]) => {
      this.currentSkippers = skippers;
    });
    this.currentPlayer = player;
  }

  ngOnInit() {
    this.getPlayers();
  }

}
