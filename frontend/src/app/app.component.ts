import { Component } from '@angular/core';
import { TaskService } from './task.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CORS-Frontend';

  constructor(private task:TaskService){
    this.task.getTask().subscribe(res=>{
      console.log("This is APi response",res);
    })
  }
}
