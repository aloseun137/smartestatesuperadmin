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
export class EstateService {

  public baseUrl = environment.baseUrl;
  public header =  {headers: {Authorization: `Bearer ${localStorage.auth_tkn}`}};
  private decodedToken;

  constructor(private http: HttpClient,  private UserProfile: ProfileService) {
  this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')!) || new DecodedToken();
  }

     // VALIDATE ESTATE
     public validateEstate(data:any): Observable<any> {
      const URI = this.baseUrl + '/estate_code_validation';
      return this.http.post<any>(URI, data, this.header);
    }

    // CREATE A NEW ESTATE
    public createEstate(data: any): Observable<any> {
    const URI = this.baseUrl + '/estates';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL ESTATE
    public getEstate(): Observable<any> {
    const URI = this.baseUrl + '/estates';
    return this.http.get<any>(URI, this.header);
  }

  // public getEstatePaginate(): Observable<any> {
  //   const URI = this.baseUrl + '/estate-index-paginate';
  //   return this.http.get<any>(URI, this.header);
  // }
  public getEstatePaginate(): Observable<any> {
    const URI = this.baseUrl + '/estates?page=1';
    return this.http.get<any>(URI, this.header);
  }


  public getEstateAllPaginate(id: any): Observable<any> {
      const URI = this.baseUrl + '/estate-index-paginate?page='+id;
      return this.http.get<any>(URI, this.header);
    }

  //  GET ONE ESTATE DETAILS
  public getEstateDetailes(id: string): Observable<any> {
    const URI = this.baseUrl + '/estates/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  EDIT ESTATE
  public editEstate(data: any): Observable<any> {
    const URI = this.baseUrl + '/estates/' + data.id;
    return this.http.patch<any>(URI, data, this.header);
  }

  // ESTATE ACTIVATION
  public updateEstateStatus(data: any): Observable<any> {
    const URI = this.baseUrl + '/product/' + data.id + '/activation';
    return this.http.patch<any>(URI, data, this.header);
  }

  //  DELETE ESTATE
  public deleteProduct(id: string): Observable<any> {
    const URI = this.baseUrl + '/product/' + id;
    return this.http.get<any>(URI, this.header);
  }
}
