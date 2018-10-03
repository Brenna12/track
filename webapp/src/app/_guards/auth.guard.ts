import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from "../authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
    check = false;

    constructor(private router: Router, private auth: AuthenticationService) {


    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.auth.isLoggedIn) {
            console.log(this.auth.isLoggedIn);
            this.router.navigate(['/home']);

            return false;

        }
        // not logged in so redirect to login page with the return url

        return true;
    }

}
