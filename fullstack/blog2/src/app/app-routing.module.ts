import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { UserEditingComponent } from './user-editing/user-editing.component';
import { AranzmanComponent } from './aranzman/aranzman.component';
import { ChatComponent } from './chat/chat.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], },
  { path: 'register', component: RegisterComponent },
  { path: 'users/:id/edit', component: UserEditingComponent}, 
  { path:'aranzman', component:AranzmanComponent},
  {path:'chat',component:ChatComponent},
  {path:'map',component:MapComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to home

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
