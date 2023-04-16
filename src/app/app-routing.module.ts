import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Core/home/home.component';
import { AuthenticationComponent } from './Feature/authentication/authentication.component';
import { LoginComponent } from './Feature/login/login.component';


const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'otpAuthentication', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
