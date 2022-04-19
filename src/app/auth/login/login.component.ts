import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { DOCUMENT } from '@angular/common';
declare var Pusher: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errors: any = [];
  notify!: string;
  loading: any = false;
  

  constructor(private auth: AuthService, 
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'registered';
      const key2 = 'loggedOut';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully registered. Please Log in';
      }
      if (params[key2] === 'success') {
        this.notify = 'You have been loggedout successfully';
      }
    });
  }

  showPassword(): void{
      const x: any = document.getElementById("myInput");

      // console.log(x['type']);
      if (x['type'] === "password") {
        x['type'] = "text";
      } else {
        x['type'] = "password";
      }
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  login(): void {
    this.loading = true;
    this.errors = [];
    this.auth.login(this.loginForm.value).subscribe(response => {
        this.loading = false;
        // const dashboard = response.data.user.role[0].slug || null;
        const dashboard =  null;
        this.router.navigate(['/superadministrator_dashboard'], { queryParams: { loggedin: dashboard } }).then(() => {window.location.reload(); });
        // if(dashboard == 'superadministrator'){
        //   this.router.navigate(['/superadministrator_dashboard'], { queryParams: { loggedin: dashboard } }).then(() => {window.location.reload(); });
        // }else if(dashboard == 'administrator'){
        //   this.router.navigate(['/administrator_dashboard'], { queryParams: { loggedin: dashboard } }).then(() => {window.location.reload(); });
        // }else if(dashboard == 'resident'){
        //   this.router.navigate(['/resident_dashboard'], { queryParams: { loggedin: dashboard } }).then(() => {window.location.reload(); });
        // }
       },
        errorResponse => {
          this.loading = false;
          this.errors.push(errorResponse.error.message);
        });
  }
}
