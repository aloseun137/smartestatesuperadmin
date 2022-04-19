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
export class StreetService {

  public baseUrl = environment.baseUrl;
  public header =  {headers: {Authorization: `Bearer ${localStorage.auth_tkn}`}};
  private decodedToken;

  constructor(private http: HttpClient,  private UserProfile: ProfileService) {
  this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')!) || new DecodedToken();
  }

    // CREATE A NEW STREET
    public createStreet(data: any): Observable<any> {
    const URI = this.baseUrl + '/streets';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL STREET
    public getStreet(): Observable<any> {
    const URI = this.baseUrl + '/streets';
    return this.http.get<any>(URI, this.header);
  }

  //  GET ONE STREET DETAILS
  public getStreetDetailes(id: string): Observable<any> {
    const URI = this.baseUrl + '/streets/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  EDIT STREET
  public editStreet(data: any): Observable<any> {
    const URI = this.baseUrl + '/streets/' + data.id;
    return this.http.patch<any>(URI, data, this.header);
  }

  // STREET ACTIVATION
  public activateStreet(data: any): Observable<any> {
    const URI = this.baseUrl + '/streets/' + data.id + '/activation';
    return this.http.patch<any>(URI, data, this.header);
  }

  //  DELETE STREET
  public deleteStreet(id: string): Observable<any> {
    const URI = this.baseUrl + '/streets/' + id;
    return this.http.delete<any>(URI, this.header);
  }
}
