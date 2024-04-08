import { Component, HostBinding, OnInit} from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit   {

  

  loginForm: FormGroup=  new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  responseData: any
  UsersArray: any
  flag: number = 0
  isLoggedIn = false
  loginFailed = false;
  constructor( private router: Router, private authService: AuthService,private snackBar: MatSnackBar) {
    console.log("login component")
   }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/admin'])
    }
    console.log('hehehehehe')
  }
  
  
 
  
 
  onSubmit(): void {
    const { email, password } = this.loginForm.value;
 
    this.authService.login(email, password).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Login successful');
          this.authService.isAuthenticated=true;
          // Perform actions upon successful login, e.g., redirect
          this.router.navigate(['admin'])
          this.snackBar.open('You are logged in !!.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'snackbar-style'
          });
        } else {
          console.log('Login failed:', response.message);
          this.loginFailed=true;
          // Handle failed login
        }
      },
      (error:any) => {
        console.error('Login error:', error);
        // Handle error
      }
    );
  }

}
