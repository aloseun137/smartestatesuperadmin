import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { EstateService } from '../services/estate/estate.service';
import { ProfileService } from './../services/profile/profile.service';

declare let notify2: any;
declare let $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  errors: any = [];
  success: any = [];
  notify: string = '';
  response: any;
  status: any;
  data: any;
  message: any;
  switchValue = false;
  roles: any[] = [];
  role: any;

  // public permissionForm = [{
  //   super_admin_dashboard: {comp: 'super_admin_dashboard', status: false}, 
  //   estate_admin_dashboard: {comp: 'estate_admin_dashboard', status: false},
  //   resident_dashboard: {comp: 'resident_dashboard', status: false},
  //   security_dashboard: {comp: 'security_dashboard', status: false}, 
  //   user_profile: {comp: 'user_profile', status: false},
  //   visits_pass: {comp: 'visits_pass', status: false},
  //   create_visits_pass_bt: {comp: 'create_visits_pass_bt', status: false},
  //   billing: {comp: 'billing', status: false}, 
  //   estate: {comp: 'estate', status: false}, 
  //   complaint: {comp: 'complaint', status: false},
  //   message: {comp: 'message', status: false},
  //   ice: {comp: 'ice', status: false}, 
  //   residents: {comp: 'residents', status: false}, 
  //   settings: {comp: 'settings', status: false},
  //   all_users: {comp: 'all_users', status: false},
  //   all_roles: {comp: 'all_roles', status: false},
  //   streets: {comp: 'streets', status: false},
  //   electricity: {comp: 'electricity', status: false}, 
  //   water: {comp: 'water', status: false}}
  // ];

  public permissionForm = [
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
  roleComponents: any  [] = [];
  countAllRoles: any;
  public updateRole: any = {
    id: '',
    name: '',
    slug: '',
    components: [],
  };


  constructor(
    private auth: AuthService,
    private estateService: EstateService,
    private router: Router,
    private userProfile: ProfileService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.auth.getRoles().subscribe(
      response => {
      this.roles = response.data;
      this.countAllRoles = this.roles.length;
      // this.getRole(this.roles[0].id)
    });
    console.log(this.roles, 'test rolees');
    
  }

  refresh(): void {
    this.permissionForm = [
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
  }

  getRole(id: any){
    this.refresh();
      this.auth.getRole(id).subscribe(
      data => {
      const getRole = data;
      this.role = getRole.data;
      if(this.role.component.length != 19){
        this.roleComponents = this.permissionForm;
        console.log(this.roleComponents);
      }else{
        this.roleComponents = this.role.component;
        console.log(this.roleComponents);
      }
      this.updateRole.id = this.role.id;
      this.updateRole.name = this.role.name;
      this.updateRole.slug = this.role.slug;
      this.updateRole.components = this.roleComponents;
    });
  }

  switch(e: any): void {
    console.log(this.updateRole);
    this.auth.updateRole(this.updateRole).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data: any): void {
    // this. loading = false;
    console.log(data);

    this.response = data.title;
    this.status = data.status;
    this.message = data.message;
    this.errors = [];
    this.success.push(this.status);
    const notis2 = new notify2('fader', 'success', this.status, this.message);
    this.success.push(this.message);

  }

  handleError(error: any): void {
    console.log(error);
    this.success = [];
    this.response = error.error.title;
    this.status = error.error.status;
    this.message = error.error.message;
    this.errors.push(this.message);
    const notis2 = new notify2('fader', 'error', 'Error', this.message);

  }

}
