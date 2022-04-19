import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SuperAdminComponent } from './dashboard/super-admin/super-admin.component';
import { EstateComponent } from './estate/estate.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SuperAdminComponent,
    MenuComponent,
    HeaderComponent,
    EstateComponent,
    RoleComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzSkeletonModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    NzDrawerModule
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    NzDrawerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
