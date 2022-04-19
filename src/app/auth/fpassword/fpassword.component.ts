import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
declare let notify2: any;

@Component({
  selector: 'app-fpassword',
  templateUrl: './fpassword.component.html',
  styleUrls: ['./fpassword.component.css']
})
export class FpasswordComponent implements OnInit {

  formData: any = {};
  errors: any = [];
  loading: any = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  password(): void {
    this.loading = true;
    this.errors = [];
    console.log(this.formData);
    this.auth.password(this.formData)
      .subscribe((data) => {
        this.loading = false;
        const notis2 = new notify2('fader', 'success', 'Success', data.message);
        this.router.navigate(['/auth/login'], { queryParams: { registered: 'success' } });
        },
        (errorResponse) => {
          this.loading = false;
          this.errors.push(errorResponse.error.message);
          const notis2 = new notify2('fader', 'error', 'Failed', errorResponse.error.message);
        });
  }

}
