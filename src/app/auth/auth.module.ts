import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FpasswordComponent } from './fpassword/fpassword.component';
import { RpasswordComponent } from './rpassword/rpassword.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { VerificationExpairiedComponent } from './verification-expairied/verification-expairied.component';


const routes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard]
  // },

  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
      { path: 'forgot-pwd', component: FpasswordComponent, canActivate: [AuthGuard] },
      { path: 'reset-password/:id', component: RpasswordComponent },
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
      { path: 'verification-expired', component: VerificationExpairiedComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    FpasswordComponent,
    RpasswordComponent,
    VerificationExpairiedComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }
