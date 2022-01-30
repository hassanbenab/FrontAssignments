import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,
    private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // si on associe ce gardien à des routes
    // on aura le droit d'y aller que si on renvoie true
    //return true;

    return this.authService.isAdmin()
    .then(authentifie => {
      if(authentifie) {
        console.log("Authentifié, navigation autorisée")
        return true;
      }
      else {
        // avant de renvoyer false, on va naviguer
        // vers une page d'erreur ou vers la page d'accueil
        console.log("NON Authentifié, navigation non autorisée");

        this.router.navigate(["/home"]);

        return false;
      }
    })

  }

}
