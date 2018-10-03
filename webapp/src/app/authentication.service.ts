import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthenticationService implements OnInit{

  token = localStorage.getItem('Token');

  helper = new JwtHelperService();

  public authenticated: boolean;


  constructor(private router: Router) { 
    if ( this.token ) {
      let decodedToken = this.helper.decodeToken(this.token);
      let expirationDate = this.helper.getTokenExpirationDate(this.token);
      let isExpired = this.helper.isTokenExpired(this.token);

      if (this.token && !isExpired) {

        let expirationDate = this.helper.getTokenExpirationDate(this.token);
        // Save authentication data and update login status subject
        localStorage.setItem('expires_at', JSON.stringify(expirationDate));
    
        this.authenticated = true;
      } 


    }
  }


  public getToken(): string {
    return localStorage.getItem('Token');
  }




 
 

 

  ngOnInit(){


    this._setSession();

  }

  checkAuthState() {
   
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    // this.loggedIn$.next(value);
    this.authenticated = value;
  }

  get isLoggedIn(): boolean {
    // Check if current date is greater
    // than expiration and user is logged in
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return this.authenticated;
  }


  logout() {
    localStorage.removeItem('Token')  ;
      localStorage.removeItem('expires_at');
    
    
    this.setLoggedIn(false);
    this.router.navigate(['/logout'])
  }


  private _setSession() {


    if ( this.token ) {
      let decodedToken = this.helper.decodeToken(this.token);
      let expirationDate = this.helper.getTokenExpirationDate(this.token);
      let isExpired = this.helper.isTokenExpired(this.token);

      if (this.token && !isExpired) {

        let expirationDate = this.helper.getTokenExpirationDate(this.token);
        // Save authentication data and update login status subject
        localStorage.setItem('expires_at', JSON.stringify(expirationDate));
    
        this.authenticated = true;
      } 


    }


  }
}
