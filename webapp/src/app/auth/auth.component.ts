import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from "../authentication.service";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private auth: AuthenticationService) {



  }

  ngOnInit() {


  }


  ngAfterViewInit() {

    this.saveAccessToken();
  }


  getParameterByName(name) {
    var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  getAccessToken() {
    return this.getParameterByName('access_token');
  }

  getIdToken() {
    return this.getParameterByName('id_token');
  }

  saveAccessToken() {
    let token = this.getAccessToken();

    localStorage.setItem('Token', token);
    let expirationDate = this.auth.helper.getTokenExpirationDate(token);
    // Save authentication data and update login status subject
    localStorage.setItem('expires_at', JSON.stringify(expirationDate));

    this.auth.setLoggedIn(true);

    this.router.navigate(['/account'])

  }

}
