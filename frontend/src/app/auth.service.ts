import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = true;
  private apiUrl = 'http://localhost:3000';
  private username:string="";
  private password:string='';
 

  constructor(private http: HttpClient,private cookieService: CookieService) { }


  login(username: any, password: any): Observable<any> {
    this.username = username
    this.password = password
 
    const url =  `${this.apiUrl}/loginUser`
    return this.http.post('http://localhost:3000/loginUser', 
      { username, password },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );

   
  }
 
  isLoggedIn():boolean{
    
    //return this.isAuthenticated
    const sessionId = this.cookieService.get('sessionID');
    if (sessionId) {
       return true;
    } else {
      return false;
    }
    
  }
  
  logout():void{
    this.isAuthenticated=false
  }

  signup(username:any, password:any, newpassword:any): Observable<any>{
    const url = `${this.apiUrl}/signupUser`
    return this.http.post(url, { username, password });
  }
 

  getUsername(){
    return this.username
  }

  getpassword(){
    return this.password
  }
}

