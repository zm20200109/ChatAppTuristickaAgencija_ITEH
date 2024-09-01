import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
     // this.router.createUrlTree(['/profile']);
      return true;
    }

    // If token does not exist, redirect to login page
    return this.router.createUrlTree(['/login']);
//return false;  
}
}
