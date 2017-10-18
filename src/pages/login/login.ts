import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {environment} from "../../environments/environment";
import {AuthService} from '../../services/auth/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  urlPrefix: string;

  constructor(private authService: AuthService, private navParams: NavParams, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.urlPrefix = environment.apiUrl;

    this.authService.setToken(this.navParams.get('token'));

    if (this.authService.getToken()) {
      this.navCtrl.push('Dashboard');
    }

  }

}
