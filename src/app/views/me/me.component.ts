import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MeService } from '../../services/me/me.service';
import { Player } from '../../models/player';


@Component({
  selector: 'app-login',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.less']
})
export class MeComponent implements OnInit {

  public me: Player = new Player();
  public saving: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private meService: MeService,
  ) {

  }

  saveUser() {
    this.saving = true;
    this.meService.setNic(this.me.nic).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    this.meService.getIdentity().subscribe((player: Player) => {
      this.me = player;
    });
  }

}
