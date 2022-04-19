import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SuperAdminComponent } from './dashboard/super-admin/super-admin.component';
import { EstateComponent } from './estate/estate.component';
import { HomeComponent } from './home/home.component';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'superadministrator_dashboard',
    pathMatch: 'full',
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RoleComponent, canActivate: [AuthGuard] },

  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  { path: 'superadministrator_dashboard', component: SuperAdminComponent, canActivate: [AuthGuard] },
  { path: 'estate', component: EstateComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
