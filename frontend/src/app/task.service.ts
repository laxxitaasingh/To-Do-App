import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,private authService: AuthService) { }
  getTask(){
    return this.http.post('http://localhost:3000/test',{
      date: new Date(),
    }, {withCredentials:true})

  }

  getTasks(): Observable<any> {
    const url = `${this.apiUrl}/tasks`
    const username = this.authService.getUsername();  
    console.log(username)
    return this.http.get(url,{withCredentials:true});
  }

  addNewTask(task:string):Observable<any>{
    const url = `${this.apiUrl}/addNewTask`
    //const username = this.authService.getUsername();  
    console.log(task)
    return this.http.post(url, {task},{withCredentials:true});
  }

  updateStatus(task:string):Observable<any>{
    const url = `${this.apiUrl}/updateStatus`;
    //const username = this.authService.getUsername();  
    return this.http.put(url, {task},{withCredentials:true})
   
}

deleteTask(task:string):Observable<any>{
  const url = `${this.apiUrl}/deleteTask`;
  //const username = this.authService.getUsername();  
  return this.http.delete(url, {body:{task},withCredentials:true});

}

editTask(oldtask:string, task:string):Observable<any>{
  const url = `${this.apiUrl}/editTask`;
  //const username = this.authService.getUsername();
  return this.http.put(url, {oldtask,task},{withCredentials:true})
}

logout(): Observable<any> {
  // Assuming your backend provides an API endpoint for logout
  const url = `${this.apiUrl}/logout`
  return this.http.delete(url,{withCredentials:true})
}









}

