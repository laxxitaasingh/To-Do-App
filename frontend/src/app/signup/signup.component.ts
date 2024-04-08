import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
constructor(private authService: AuthService, private router: Router, private snackBar : MatSnackBar){
  console.log('SignupComponent');
}

signupForm = new FormGroup({
  
  email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
  password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])),
  confirmPassword: new FormControl('', Validators.required)
})

onSubmit(): void {
  const { email, password, confirmPassword } = this.signupForm.value;
  if (password !== confirmPassword) {
    alert("password and confirm password does not match")
  }

  else {
    this.authService.signup(email, password, confirmPassword).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Regis successful');
          alert("registered successfully")
         
          this.router.navigate(['/login'])
        } else {
          console.log('Regis failed:', response.message);
          this.snackBar.open('username already exist !!.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'snackbar-style'
          });
          this.router.navigate(['/login'])

          // Handle failed login
        }
      },
      (error:any) => {
        console.error('Regis error:', error);
        // Handle error
      }
    );
  }
}




}
