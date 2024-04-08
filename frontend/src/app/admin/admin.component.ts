import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
//import { DialogboxComponent } from '../admin/dialogbox/dialogbox.component'

//import { trigger, state, style, transition, animate } from '@angular/animations';
export interface Task {
  taskId: number;
  username: string;
  task_title: string;
  isCompleted: number;
}



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']

})
export class AdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  task: any = []
  // task : Task[] = []
  newTaskTitle: string = '';
  showInputBox: boolean = false;
  showEditbox: boolean = false;
  editedTaskTitle: string = '';
  editingTaskIndex: number = -1;
  sessionId: string = ''


  dataSource = new MatTableDataSource<any>(this.task);
  displayedColumns: string[] = ['task_title', 'isCompleted', 'changeStatus', 'edit', 'delete', 'editTask'];
  //displayedColumns: string[] = ['task_title', 'isCompleted', 'editTask', 'deleteTask'];

  username: string = this.authService.getUsername()



  constructor(private authService: AuthService, private router: Router, private taskService: TaskService,
     private cookieService: CookieService, private snackBar: MatSnackBar) {
    console.log("admin component")
  }


  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.taskService.getTasks().subscribe(
      (tasks: any) => {
        console.log(tasks)
        this.task = tasks.message
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }

    );

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  logout() {
    this.taskService.logout().toPromise().then(() => {
      console.log('User logged out successfully.');
      // Additional client-side logout actions (if any)
    }).catch(error => {
      console.error('Error logging out:', error);
    });


    this.cookieService.delete('sessionID');
    this.router.navigate(['/login']);
    this.snackBar.open('You are logged out.', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'snackbar-style'
    });

  

    
    


  }


  changeStatus(task: string) {
    this.taskService.updateStatus(task).subscribe(
      (res: any) => {
        const taskIndex = this.task.findIndex((t: any) => t.task_title === task);
        this.task[taskIndex].isCompleted = 1;
        console.log(res)


      },
      (err: any) => {
        console.log("error updating status")
      }
    )
  }


  deleteTask(task: string) {
    console.log('delete', task)
    this.taskService.deleteTask(task).subscribe(
      (res: any) => {
        this.task = this.task.filter((t: any) => t.task_title !== task);
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  addTask() {
    this.taskService.addNewTask(this.newTaskTitle).subscribe(
      (t: any) => {
        console.log(t)
        console.log("this.task", this.task)
        if (this.newTaskTitle.trim() !== "") {
          this.task.push({ taskId: 0, username: this.username, task_title: this.newTaskTitle, isCompleted: 0 })
          this.task = [...this.task]
          this.dataSource._updateChangeSubscription();
        }
        else {
          this.snackBar.open('Task cannot be empty!', 'OK', {
            duration: 2000,
            panelClass: 'error-snackbar', // You can add a custom CSS class for styling errors
          });
        }
      },
      (err: any) => {
        console.log('error adding task', err)

      }
    )
    this.showInputBox = false;
  }



  toggleInputBox() {
    this.showInputBox = !this.showInputBox;
    if (this.showInputBox) {
      this.newTaskTitle = '';
    }
  }
  // closeToggleBox() {
  //   // Reset editingTaskIndex to a value that is not equal to the current index
  //   this.editingTaskIndex = -1; // or any value that suits your logic
  // }


  editTask(oldtask: string) {
    this.taskService.editTask(oldtask, this.editedTaskTitle).subscribe(
      (t: any) => {
        console.log("task added");
        this.task[this.editingTaskIndex].task_title = this.editedTaskTitle;
        this.editingTaskIndex = -1;
      },
      (err: any) => {
        console.log('error adding task', err);

      }
    )
  }

  toggleEditbox(index: number) {
    this.editingTaskIndex = this.editingTaskIndex === index ? -1 : index;
    this.editedTaskTitle = '';
  }

  // openEditTaskDialog(taskTitle: string, index: number): void {
  //   const dialogRef = this.dialog.open(DialogboxComponent, {
  //     width: '300px',
  //     data: { taskTitle }
  //   });

  //   dialogRef.afterClosed().subscribe((result: string) => {
  //     if (result) {
  //       // Call your editTask method with the updated task title
  //       this.editTask(result);
  //     }
  //   });
  // }






}
