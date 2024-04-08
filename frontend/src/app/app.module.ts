import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule ,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './shared/auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorComponent } from './error/error.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ErrorInterceptor } from './interceptors/error.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { DialogboxComponent } from './admin/dialogbox/dialogbox.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    SignupComponent,
    ErrorComponent,
   // DialogboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  providers: [AuthGuard,CookieService,  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
