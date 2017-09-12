import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ConfigService } from '../services/config/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }

   public urlPrefix;

  ngOnInit() {
     this.urlPrefix = this.configService.apiUrl();

    this.activatedRoute.params.subscribe((params: Params) => {
        this.configService.setToken(params['token']);
        if (this.configService.getToken()) {
          this.router.navigate(['/dashboard']);
        }
      });
  }

}
