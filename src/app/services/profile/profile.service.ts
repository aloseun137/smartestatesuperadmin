import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public baseUrl = environment.baseUrl;
  public header =  {headers: {Authorization: `Bearer ${localStorage._token}`}};

  public me: BehaviorSubject<any> = new BehaviorSubject({});

  public user: any = {
    id: null,
    name: null,
    gender: null,
    username: null,
    image: null,
    phone_number: null,
    email: null,
    status: null,
    estate: null,
    role: null,
    customer_id: null,

    user_id: null,
    resident_id: null,
    moved_in: null,
    address: null,
    leased_period: null,
    meter_number: null
  };

  constructor(private http: HttpClient) { }

   public handleUserProfile(user: any): void{
    this.setUser(user);
  }

  public setUser(user: any): void{
    const me = user.user;
    this.user.id = me.id;
    this.user.name = me.name;
    this.user.gender = me.gender;
    this.user.username = me.username;
    this.user.email = me.email;
    this.user.status = '';
    this.user.image = me.image;
    this.user.role = me.role;
    this.user.estate = me.estate;
    this.user.customer_id = me.customer_id;
    this.user.phone_number = me.phone;

    this.user.user_id = me.user_id;
    this.user.resident_id = me.resident_id;
    this.user.moved_in = me.moved_in;
    this.user.address = me.address;
    this.user.leased_period = me.leased_period;
    this.user.meter_number = me.meter_number;
    localStorage.setItem('user_id', this.user.id);
  }

  public getProfile() {
    return this.user;
  }

  getUserId() {
    return localStorage.getItem('user_id');
  }

//  get myId(){
//    return localStorage.getItem("_me")
//   }

  // public changePassword(data) {
  //   return this.http.post<any>(this.baseUrl + 'ChangePassword', data, this.header);
  // }
}
