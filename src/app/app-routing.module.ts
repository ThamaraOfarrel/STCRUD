import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './login/screens/home/home.component';
import { LoginScreenComponent } from './login/screens/login-screen/login-screen.component';
import { PersonalComponent } from './login/screens/personal/personal.component';

const routes: Routes = [
    { path: 'login', component: LoginScreenComponent },
    { path: 'home/:id', component: HomeComponent},
    { path: 'personal/:id', component: PersonalComponent},
    { path: '**', component: LoginScreenComponent } 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
