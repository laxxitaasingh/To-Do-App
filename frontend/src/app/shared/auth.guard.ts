import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authservice: AuthService,private router :Router,private snackBar: MatSnackBar ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authservice.isLoggedIn()) {
        this.router.navigate(['/admin']);
        return true;
      } else {
        this.router.navigate(['/login']);
       // window.alert('You must be logged in to access this page.');
       this.snackBar.open('You must be logged in to access this page.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'snackbar-style'
      });
        return false;
      }
  }
  
}
