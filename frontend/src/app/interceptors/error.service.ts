
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for displaying error messages
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error (e.g., redirect to login page)
          console.error('Unauthorized error:', error);
          // You can redirect to a login page or display a custom message
          this.router.navigate(['/login']);
          this.snackBar.open('Unauthorized Access. Please login.', 'Close', { duration: 5000 });
        }
        return throwError(error);
      })
    );
  }
}



export class ErrorService {

  constructor() { }
}
