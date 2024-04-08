import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  
  constructor(private router : Router){}
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToSignup(){
    this.router.navigate(['/signup'])
  }

}
