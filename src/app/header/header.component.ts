import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from './../services/profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  response: any;

  roleName: any;
  public user = {

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

  constructor(public auth: AuthService, private router: Router, private UserProfile: ProfileService) { }

  ngOnInit(): void {

    const getProfile = this.auth.getProfile().subscribe(
      data => {
      this.response = data;
      const profile =  this.response.user;
      this.user.id = profile.id;
      this.user.name = profile.name;
      this.user.gender = profile.gender;
      this.user.username = profile.username;
      this.user.email = profile.email;
      this.user.status = this.response.status;
      this.user.image =  profile.imageName;
      this.user.estate = profile.estate;
      this.user.role = profile.role;
      this.roleName = profile.role[0].name;
      this.user.customer_id = null;

      console.log(this.user);
    });
  }

  logout(): void {
    
    this.auth.logout();
    this.router.navigate(['/auth/login'], {queryParams: {loggedOut: 'success'}});
    // this.router.navigateByUrl(['/auth/login'], {queryParams: {loggedOut: 'success'}}).then(() => {window.location.reload()});
  }

  // logout(event : MouseEvent){
  //   // this.storage.clear().subscribe({
  //   //   next: () => { },
  //   //   error: (error) => { }
  //   // });

  //   this.token.remove();
  //   this.auth.changeAuthService(false);
  //   this.router.navigateByUrl('');
  // }
}
