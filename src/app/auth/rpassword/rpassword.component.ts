import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
declare let notify2: any;

@Component({
  selector: 'app-rpassword',
  templateUrl: './rpassword.component.html',
  styleUrls: ['./rpassword.component.css']
})
export class RpasswordComponent implements OnInit {
  formData: any = {};
  errors: any = [];
  loading: any = false;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params => {
      this.formData.token  = params.get('id'); 
    }));
  }

  password(): void {
    this.loading = true;
    this.errors = [];
    console.log(this.formData);
    this.auth.userResetPassword(this.formData)
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
