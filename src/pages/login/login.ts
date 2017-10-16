import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {environment} from "../../environments/environment";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  urlPrefix: string;

  constructor() {
  }

  ngOnInit() {
    this.urlPrefix = environment.apiUrl;
    /*
    this.authService.setToken(this.navParams.get('token'));
    if (this.authService.getToken()) {
      this.router.navigate(['/dashboard']);
    }
    */
  }

}
