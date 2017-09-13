import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AuthService } from '../../services/auth/auth.service';
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
  ) {

  }

   public urlPrefix;

  ngOnInit() {
     this.urlPrefix = environment.apiUrl;

    this.activatedRoute.params.subscribe((params: Params) => {
        this.authService.setToken(params['token']);
        if (this.authService.getToken()) {
          this.router.navigate(['/dashboard']);
        }
      });
  }

}
