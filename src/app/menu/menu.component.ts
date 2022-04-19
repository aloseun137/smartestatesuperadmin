import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from './../services/profile/profile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  response: any;
  roleName: any;
  public user: any = {

    id: null,
    name: null,
    gender: null,
    username: null,
    image: null,
    phone_number: null,
    email: null,
    status: null,
    estate: {},
    role: [],
    customer_id: null,
  };

  public menuPermission = [
    {comp: 'super_admin_dashboard', status: false}, 
    {comp: 'estate_admin_dashboard', status: false},
    {comp: 'resident_dashboard', status: false},
    {comp: 'security_dashboard', status: false}, 
    {comp: 'user_profile', status: false},
    {comp: 'visits_pass', status: false},
    {comp: 'create_visits_pass_bt', status: false},
    {comp: 'billing', status: false}, 
    {comp: 'estate', status: false}, 
    {comp: 'complaint', status: false},
    {comp: 'message', status: false},
    {comp: 'ice', status: false}, 
    {comp: 'residents', status: false}, 
    {comp: 'settings', status: false},
    {comp: 'all_users', status: false},
    {comp: 'all_roles', status: false},
    {comp: 'streets', status: false},
    {comp: 'electricity', status: false}, 
    {comp: 'water', status: false}
  ];

  getRole: any[]= [];
  role: any;
  roleId: any;
  estateName: any

  constructor(public auth: AuthService, private router: Router, private UserProfile: ProfileService) { }

  ngOnInit(): void {

    // const getProfile = this.UserProfile.getProfile();

  const getProfile = this.auth.getProfile().subscribe(
      data => {
      this.response = data;
      const profile =  this.response.user;
      this.user.id = profile.id;
      this.user.status = this.response.status;
      this.user.image = 'assets/img/user22.png';
      this.user.estate = profile.estate;
      this.estateName = profile.estate.name;
      this.user.role = profile.role;
      this.roleName = profile.role[0].slug;
      this.roleId = profile.role[0].id;
      this.menuPermission = profile.role_access_component;

      console.log(this.menuPermission, 'test permission');
    });
  }

  dashboard(id: any, route: any): void{
    this.route(route, null)

    // this.getRole =  this.user.role.filter((component: any) => {


    //   return component.id === id;
    // });

    // if (this.getRole.length !== 0){
    //   this.role = this.getRole[0];
    //   const permision =  this.role.slug;
    //   this.route(route, permision);
    // }else{

    // }
  }

  route(route: any, permision: any): void{
    this.router.navigate(['/' + route], { queryParams: { loggedin: permision } });
    // .then(() => {window.location.reload(); });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login'], {queryParams: {loggedOut: 'success'}});
  }

}
