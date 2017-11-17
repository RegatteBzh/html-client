import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AuthService } from '../../services/auth/auth.service';
import { MeService } from '../../services/me/me.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private meService: MeService,
  ) {

  }

   public urlPrefix;

  ngOnInit() {
     this.urlPrefix = environment.apiUrl;

    this.activatedRoute.params.subscribe((params: Params) => {
        this.authService.setToken(params['token']);
        if (this.authService.getToken()) {
          this.meService.getIdentity();
          this.router.navigate(['/dashboard']);
        }
      });
  }

}
