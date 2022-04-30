import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './screens/home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { PersonalComponent } from './screens/personal/personal.component';
import { EditComponent } from './screens/edit/edit.component';



@NgModule({
  declarations: [
    LoginScreenComponent,
    HomeComponent,
    PersonalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,   
    ReactiveFormsModule, 
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    LoginScreenComponent
  ],
  entryComponents:[EditComponent]
})
export class LoginModule { }
