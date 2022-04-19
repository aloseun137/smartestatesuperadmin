import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../environments/environment';
import { ProfileService } from '../profile/profile.service';
const jwt = new JwtHelperService();

class DecodedToken {
  exp!: number;
  username: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  public baseUrl = environment.baseUrl;
  public header =  {headers: {Authorization: `Bearer ${localStorage.auth_tkn}`}};
  private decodedToken;

  constructor(private http: HttpClient,  private UserProfile: ProfileService) {
  this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')!) || new DecodedToken();
  }

    // CREATE A NEW RESIDENTS
    public createResident(data: any): Observable<any> {
    const URI = this.baseUrl + '/residents';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL RESIDENTS
    public getResidents(): Observable<any> {
    const URI = this.baseUrl + '/residents';
    return this.http.get<any>(URI, this.header);
  }

  public getResidentsPaginate(id: any): Observable<any> {
    const URI = this.baseUrl + '/residents?page='+id;
    return this.http.get<any>(URI, this.header);
  }


   //  GET RESIDENTS BY ESTATE
   public getResidentsByEstateId(id: any): Observable<any> {
    const URI = this.baseUrl + '/residents?estate_id=' + id;
    return this.http.get<any>(URI, this.header);
  }

     //  GET SEARCH BY ESTATE
     public getResidentsBySearch(id: any, val: any): Observable<any> {
      const URI = this.baseUrl + '/residents?estate_id=' + id + '&search=' + val;
      return this.http.get<any>(URI, this.header);
    }

  //  GET ONE RESIDENTS DETAILS
  public getResidentDetails(id: string): Observable<any> {
    const URI = this.baseUrl + '/residents/' + id;
    return this.http.get<any>(URI, this.header);
  }

  public resendVerificationEmail(data: any): Observable<any> {
    const URI = this.baseUrl + '/resend-verification-email';
    return this.http.post<any>(URI, data, this.header);
  }

  //  EDIT RESIDENTS
  public editResident(data: any): Observable<any> {
    const URI = this.baseUrl + '/residents/' + data.id;
    return this.http.patch<any>(URI, data, this.header);
  }

  // RESIDENTS ACTIVATION
  public activateResident(data: any): Observable<any> {
    const URI = this.baseUrl + '/user_toggle_status';
    return this.http.post<any>(URI, data, this.header);
  }

  //  DELETE RESIDENTS
  public deleteResident(id: string): Observable<any> {
    const URI = this.baseUrl + '/residents/' + id;
    return this.http.delete<any>(URI, this.header);
  }
}
