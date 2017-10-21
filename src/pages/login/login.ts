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
    this.authService.setToken(null);
    this.urlPrefix = environment.apiUrl;

    let token = this.navParams.get('token');
    if (token) {
      this.authService.setToken(token);
      this.navCtrl.setRoot('DashboardPage');
    }
  }

}
