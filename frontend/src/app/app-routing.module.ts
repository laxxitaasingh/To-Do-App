import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './shared/auth.guard';
import { ErrorComponent } from './error/error.component';



const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'admin', component: AdminComponent},
  {path:'signup', component: SignupComponent},
  {path:'', component:LoginComponent},
  {path:"**", component: ErrorComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
