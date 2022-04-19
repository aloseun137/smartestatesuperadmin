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
export class UtilitiesService {

public baseUrl = environment.baseUrl;
public header =  {headers: {Authorization: `Bearer ${localStorage.auth_tkn}`}};
private decodedToken;

constructor(private http: HttpClient,  private UserProfile: ProfileService) {
this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')!) || new DecodedToken();
}

// PASS CITIES

  // CREATE CITIES
  public createCity(data: any): Observable<any> {
  const URI = this.baseUrl + '/cities';
  return this.http.post<any>(URI, data, this.header);
}

//  GET ALL CITIES
  public getAllCities(): Observable<any> {
  const URI = this.baseUrl + '/cities';
  return this.http.get<any>(URI, this.header);
}

//  CITY BY STATE
public getCityByState(id: string): Observable<any> {
  const URI = this.baseUrl + '/city_filter_by_state/' + id;
  return this.http.get<any>(URI, this.header);
}

//  GET ONE CITY
public getCityById(id: string): Observable<any> {
  const URI = this.baseUrl + '/cities/' + id;
  return this.http.get<any>(URI, this.header);
}

//  EDIT CITY
public editCity(data: any): Observable<any> {
  const URI = this.baseUrl + '/cities/' + data.id;
  return this.http.patch<any>(URI, data, this.header);
}

//  DELETE CITY
public deleteCity(id: string): Observable<any> {
  const URI = this.baseUrl + '/cities/' + id;
  return this.http.get<any>(URI, this.header);
}

  //COUNTRY

  // CREATE COUNTRY
  public createCountry(data: any): Observable<any> {
    const URI = this.baseUrl + '/countries';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL COUNTRY
    public getAllCountry(): Observable<any> {
    const URI = this.baseUrl + '/countries';
    return this.http.get<any>(URI, this.header);
  }

  //BANKS

  // CREATE BANK
  public createBank(data: any): Observable<any> {
    const URI = this.baseUrl + '/banks';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL BANKS
    public getAllBanks(): Observable<any> {
    const URI = this.baseUrl + '/banks';
    return this.http.get<any>(URI, this.header);
  }

    //STATES

  // CREATE STATE
  public createState(data: any): Observable<any> {
    const URI = this.baseUrl + '/states';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL STATES
    public getAllStates(): Observable<any> {
    const URI = this.baseUrl + '/states';
    return this.http.get<any>(URI, this.header);
  }

}
