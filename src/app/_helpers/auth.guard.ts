import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       let user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            return true;
        } 
        else {
    
            // not logged in so redirect to login page with the return url
            // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    this.router.navigate(['/management/login']);
            return false;
        }

        
    }
}