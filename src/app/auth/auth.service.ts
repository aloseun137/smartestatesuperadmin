import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';

import * as moment from 'moment';
import { ProfileService } from '../services/profile/profile.service';

const jwt = new JwtHelperService();

class DecodedToken {
  exp?: number;
  username?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private uriseg = 'http://localhost:5000/api/users';
  // private uriseg = 'https://dev.smartestateapp.com/smartestateserver/public/api'
  // https://smartestateserver.lp46men.org/api
  private uriseg = environment.baseUrl;;
  private decodedToken;

  constructor(private http: HttpClient,  private UserProfile: ProfileService) {
    this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')!) || new DecodedToken();
   }

  public register(userData: any): Observable<any> {
    const URI = this.uriseg + '/residents';
    return this.http.post(URI, userData);
  }

  public createUser(userData: any): Observable<any> {
    const URI = this.uriseg + '/admin/user';
    return this.http.post(URI, userData, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
        }).pipe(map(response => {
        return response;
      }));
  }

  public password(userData: any): Observable<any> {
    const URI = this.uriseg + '/forgot_password';
    return this.http.post(URI, userData);
  }

  public verificationEmail(userData: any): Observable<any> {
    const URI = this.uriseg + '/resend-verification-email';
    return this.http.get(URI, userData);
  }

  public resetPassword(userData: any): Observable<any> {
    const URI = this.uriseg + '/reset_password';
    return this.http.post(URI, userData, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
        }).pipe(map(response => {
        return response;
      }));
  }

  public userResetPassword(userData: any): Observable<any> {
    const URI = this.uriseg + '/user_reset_password';
    return this.http.post(URI, userData);
  }

  public login(userData: any): Observable<any> {

    const URI = this.uriseg + '/user/login';
    return this.http.post(URI, userData).pipe(map((response: any) => {
      
      const token = response['data'].token;
      console.log(response['data'], 'logged in user');
      // this.UserProfile.handleUserProfile(response['data']);
      this.saveUserDetails(response['data']);
            console.log(response['data'], 'test data');

      this.saveToken(token);
      return response;
    }));
  }

 public getProfile(): Observable<any> {
    const URI = this.uriseg + '/get_authenticated_user';
    return this.http.get(URI, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
      }).pipe(map((response: any) => {
      const status = response['status'];
      const data = response['data'];
      this.UserProfile.handleUserProfile(data);
      return data;
    }));
  }

  public getUser(id: string): Observable<any> {
    const URI = this.uriseg + '/users/' + id;
    return this.http.get(URI, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
      }).pipe(map(response => {
      return response;
    }));
  }

  public getUserPaginate(page: any): Observable<any> {
    const URI = this.uriseg + '/users?page='+page;
    return this.http.get(URI, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
      }).pipe(map(response => {
      return response;
    }));  }

  public searchUser(id: string): Observable<any> {
    const URI = this.uriseg + '/users/' + id;
    return this.http.get(URI, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
      }).pipe(map(response => {
      return response;
    }));
  }

  public getUserByEstate(id: string): Observable<any> {
    const URI = this.uriseg + '/users?estate_id=' + id;
    return this.http.get(URI, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
      }).pipe(map(response => {
      return response;
    }));
  }

  public getRoles(): Observable<any> {
    const URI = this.uriseg + '/role';
    return this.http.get(URI, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
      }).pipe(map(response => {
      return response;
    }));
  }

  public getRole(id: any): Observable<any> {
    const URI = this.uriseg + '/role/'+id;
    return this.http.get(URI, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
      }).pipe(map(response => {
      return response;
    }));
  }

  public updateRole(roleData: any): Observable<any> {
    const URI = this.uriseg + '/roles/' + roleData.id;
    return this.http.patch(URI, roleData, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
        }).pipe(map(response => {
        return response;
      }));
  }

  public updateProfile(userData: any): Observable<any> {
    const URI = this.uriseg + '/users/' + userData.id;
    return this.http.patch(URI, userData, {headers: { Authorization: `Bearer ${localStorage.auth_tkn}`}
        }).pipe(map(response => {
        return response;
      }));
  }

  public allUsers(): Observable<any> {
    const URI = this.uriseg + '/admin/user';
    return this.http.get(URI, {headers: {
      Authorization: `Bearer ${localStorage.auth_tkn}`
    }});
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  private saveUserDetails(userData: any): any {
    localStorage.setItem('user_data', JSON.stringify(userData));
  }

  getAuthUser(): any {
    return JSON.parse(localStorage.getItem('user_data')!);
  }

  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    localStorage.removeItem('user_data');
    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }
}
