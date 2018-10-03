import { Component, OnInit } from '@angular/core';
// import { environment } from '../../environments/environment';
import { EnvironmentService } from '../environment.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUrl: string;
  constructor(private environment: EnvironmentService) {

    console.log(window.location)
    let authUrl = environment.config.authentication.authUrl;
    let cid = environment.config.authentication.client_id;
    let redirect = window.location.origin + '/auth';
    let scope = environment.config.authentication.scope;
    let res = environment.config.authentication.response_type;


    this.loginUrl = authUrl + '?client_id=' + cid + '&redirect_uri=' + redirect + '&response_type=' + res + '&scope=' + scope;

  }

  ngOnInit() {

    console.log(this.loginUrl)

  }

}
