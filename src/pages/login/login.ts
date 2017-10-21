import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {environment} from "../../environments/environment";
import {AuthService} from '../../services/auth/auth.service';
import {GooglePlus} from "@ionic-native/google-plus";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  urlPrefix: string;
  desktop: boolean;
  result: string;
  resultE: string;



  constructor(public platform: Platform, private googlePlus: GooglePlus, private authService: AuthService, private navParams: NavParams, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.authService.setToken(null);
    this.urlPrefix = environment.apiUrl;

    let token = this.navParams.get('token');
    if (token) {
      this.authService.setToken(token);
      this.navCtrl.setRoot('DashboardPage');
    }

    this.desktop = this.platform.is("core");
  }

  loginUser(): void {
    this.googlePlus.login({
      'webClientId': '83973204363-76443ipa9hhqs09cq1k455u5ttnmffuv.apps.googleusercontent.com'
    }).then( res => {
      this.result = res;
      this.authService.setToken(res.idToken);
      // Register to API
      // TODO

      // navigate to dashboard
      this.navCtrl.setRoot('DashboardPage');
    })
      .catch(err =>{
        this.resultE = err;
        console.error(err)
      } );
  }

}
