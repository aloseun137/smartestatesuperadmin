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
export class ComplaintService {

  public baseUrl = environment.baseUrl;
  public header =  {headers: {Authorization: `Bearer ${localStorage.auth_tkn}`}};
  // private decodedToken;

  constructor(private http: HttpClient) {
  // this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
  }

  // COMPLAINT CATEGORY


  // CREATE A NEW COMPLAINT CATEGORY
  public createComplaintCategory(data): Observable<any> {
    const URI = this.baseUrl + '/complain_categories';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL COMPLAINTS CATEGORIES
    public getComplaintCategories(): Observable<any> {
    const URI = this.baseUrl + '/complain_categories';
    return this.http.get<any>(URI, this.header);
  }

  //  GET ONE COMPLAINT CATEGORY DETAILS
  public getComplaintCategoryDetailes(id: string): Observable<any> {
    const URI = this.baseUrl + '/complain_categories/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  EDIT COMPLAINT CATEGORY
  public editComplaintCategory(data): Observable<any> {
    const URI = this.baseUrl + '/complain_categories/' + data.id;
    return this.http.patch<any>(URI, data, this.header);
  }

  // COMPLAINT ACTIVATION
  public validateComplaintCategory(id: string): Observable<any> {
    const URI = this.baseUrl + '/complain_categories/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  DELETE COMPLAINT
  public deleteCategorycomplaint(id: string): Observable<any> {
    const URI = this.baseUrl + '/complain_categories/' + id;
    return this.http.delete<any>(URI, this.header);
  }


  // COMPLAINT

    // CREATE A NEW COMPLAINT
    public createComplaint(data): Observable<any> {
    const URI = this.baseUrl + '/complains';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL COMPLAINTS
    public getComplaint(): Observable<any> {
    const URI = this.baseUrl + '/complains';
    return this.http.get<any>(URI, this.header);
  }

  public getComplaintPaginate(id): Observable<any> {
    const URI = this.baseUrl + '/complains?page='+id;
    return this.http.get<any>(URI, this.header);
  }

  public getComplaintUser(id: string): Observable<any> {
    const URI = this.baseUrl + '/complains_per_user/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  GET ONE COMPLAINT DETAILS
  public getComplaintDetailes(id: string): Observable<any> {
    const URI = this.baseUrl + '/complains/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  EDIT COMPLAINT
  public editComplaint(data): Observable<any> {
    const URI = this.baseUrl + '/complains/' + data.id;
    return this.http.patch<any>(URI, data, this.header);
  }

  // COMPLAINT ACTIVATION
  public closeComplaintTicket(id: string): Observable<any> {
    const URI = this.baseUrl + '/complains/close-ticket/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  DELETE COMPLAINT
  public deletecomplaint(id: string): Observable<any> {
    const URI = this.baseUrl + '/complains/' + id;
    return this.http.delete<any>(URI, this.header);
  }


  // COMPLAINT RESPONSE

  // CREATE A NEW COMPLAINT RESPONSE
  public createComplaintResponse(data): Observable<any> {
    const URI = this.baseUrl + '/complain_responses';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL COMPLAINTS RESPONSE
    public getComplaintResponse(): Observable<any> {
    const URI = this.baseUrl + '/complain_responses';
    return this.http.get<any>(URI, this.header);
  }

}
