import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../environments/environment';
import { ProfileService } from '../profile/profile.service';
const jwt = new JwtHelperService();

class DecodedToken {
  exp: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class PassService {

  public baseUrl = environment.baseUrl;
  public header =  {headers: {Authorization: `Bearer ${localStorage.auth_tkn}`}};
  private decodedToken;

  constructor(private http: HttpClient,  private UserProfile: ProfileService) {
  this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
  }

  // PASS CATEGORIES

    // CREATE PASS CATEGORIES
    public createPassCategory(data): Observable<any> {
    const URI = this.baseUrl + '/visitor_pass_categories';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL PASS CATEGORIES
    public getPassCategory(): Observable<any> {
    const URI = this.baseUrl + '/visitor_pass_categories';
    return this.http.get<any>(URI, this.header);
  }

  //  GET ONE PASS CATEGORIES
  public getPassCategoryById(id: string): Observable<any> {
    const URI = this.baseUrl + '/visitor_pass_categories/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  EDIT PASS CATEGORIES
  public editPassCategory(data): Observable<any> {
    const URI = this.baseUrl + '/visitor_pass_categories/' + data.id;
    return this.http.patch<any>(URI, data, this.header);
  }

  //  DELETE PASS CATEGORIES
  public deletePassCategory(id: string): Observable<any> {
    const URI = this.baseUrl + '/visitor_pass_categories/' + id;
    return this.http.get<any>(URI, this.header);
  }


    //VISITOR PASS

    // CREATE VISITOR PASS
    public createPass(data): Observable<any> {
      const URI = this.baseUrl + '/visitor_passes';
      return this.http.post<any>(URI, data, this.header);
    }

    //  GET ALL VISITOR PASS
      public getPass(): Observable<any> {
      const URI = this.baseUrl + '/visitor_passes';
      return this.http.get<any>(URI, this.header);
    }

    public getPassPaginate(id): Observable<any> {
      const URI = this.baseUrl + '/visitor_passes?page='+id;
      return this.http.get<any>(URI, this.header);
    }

    //  GET ONE VISITOR PASS
    public getPassById(id: any): Observable<any> {
      const URI = this.baseUrl + '/visitor_passes/' + id;
      return this.http.get<any>(URI, this.header);
    }

    public getPassByUser(id: string): Observable<any> {
      const URI = this.baseUrl + '/visitor_passes_per_user/' + id;
      return this.http.get<any>(URI, this.header);
    }

      // Validate VISITOR PASS
      public validatePassCode(code: string, status: string): Observable<any> {
      const URI = this.baseUrl + '/visitor_pass_authentication?invitation_code=' + code + '&status=' + status;
      return this.http.get<any>(URI, this.header);
    }

    public approvePassCode(data): Observable<any> {
      const URI = this.baseUrl + '/activate-deactivate-pass/' + data.id;
      return this.http.post<any>(URI, data.data, this.header);
    }

    //  EDIT VISITOR PASS
    public editPass(data): Observable<any> {
      const URI = this.baseUrl + '/visitor_passes/' + data.id;
      return this.http.put<any>(URI, data, this.header);
    }

    //  CHECKIN CHECKOUT VISITOR PASS
    public checkinCheckout(data): Observable<any> {
      const URI = `${this.baseUrl}/visitor_pass_authentication?status=${data.status}&invitation_code=${data.invitation_code}`;
      return this.http.put<any>(URI, data, this.header);
    }

    //  DELETE VISITOR PASS
    public deletePass(id: string): Observable<any> {
      const URI = this.baseUrl + '/visitor_passes/' + id;
      return this.http.delete<any>(URI, this.header);
    }
}
