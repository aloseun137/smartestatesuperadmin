import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
declare let notify2: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  validateFormData: any = {};
  errors: any = [];
  success: any = [];
  loading: any = false;
  streets: any;
  countAllstreet: any;
  validateEstate: any;
  estateStatus?: boolean;
  message: any;
  status: any;

  constructor(private auth: AuthService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.estateStatus = false;
  }

  validate(): void{
    this.formData.estateCode = this.validateFormData.estate_code;
    this.loading = true;

  }

  register(): void {
    this.loading = true;
    this.errors = [];
    console.log(this.formData);
    this.auth.register(this.formData)
      .subscribe( data => {
        this.loading = false;
        this.errors = [];
        this.status = 'success';
        this.success.push(this.status);
        this.message = data.message;
    
        this.router.navigate(['/auth/login'], { queryParams: { registered: 'success' } });
        const notis2 = new notify2('fader', 'success', this.status, this.message);
       },
        (errorResponse) => {
          this.loading = false;
          this.errors.push(errorResponse.error.message);
          const notis2 = new notify2('fader', 'error', 'Failed', errorResponse.error.message);
        });
  }
}
