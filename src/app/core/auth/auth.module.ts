import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatInputModule,
    MatSnackBarModule
  ]
})
export class AuthModule { }
