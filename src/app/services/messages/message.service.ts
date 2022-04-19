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
export class MessageService {

  public baseUrl = environment.baseUrl;
  public header =  {headers: {Authorization: `Bearer ${localStorage.auth_tkn}`}};
  private decodedToken;

  constructor(private http: HttpClient,  private UserProfile: ProfileService) {
  this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
  }

  // MESSAGE GROUP


  // CREATE MESSAGE GROUP
  public createMessageGroups(data): Observable<any> {
    const URI = this.baseUrl + '/notification_groups';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL MESSAGE GROUP
    public getMessageGroups(): Observable<any> {
    const URI = this.baseUrl + '/notification_groups';
    return this.http.get<any>(URI, this.header);
  }

  //  GET ONE MESSAGE GROUP
  public getMessageGroupsDetailes(id: string): Observable<any> {
    const URI = this.baseUrl + '/notification_groups/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  EDIT MESSAGE GROUP
  public editMessageGroups(data): Observable<any> {
    const URI = this.baseUrl + '/notification_groups/' + data.id;
    return this.http.patch<any>(URI, data, this.header);
  }

  // MESSAGE GROUP ACTIVATION
  public validateMessageGroups(id: string): Observable<any> {
    const URI = this.baseUrl + '/notification_groups/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  DELETE MESSAGE GROUP
  public deleteMessageGroup(id: string): Observable<any> {
    const URI = this.baseUrl + '/notification_groups/' + id;
    return this.http.delete<any>(URI, this.header);
  }


  // MESSAGE

    // CREATE A NEW MESSAGE
    public createMessage(data): Observable<any> {
    const URI = this.baseUrl + '/notifications';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL MESSAGES
    public getMessages(): Observable<any> {
    const URI = this.baseUrl + '/notifications';
    return this.http.get<any>(URI, this.header);
  }

    //  GET ALL MESSAGES
    public getMessages2(pageIndex: any, pageSize: any, sortField: any, sortOrder: any, filter: any): Observable<any> {
    const URI = this.baseUrl + '/notifications?page='+pageIndex;
    return this.http.get<any>(URI, this.header);
  }

  //  GET ONE MESSAGE
  public getMessageDetailes(id: string): Observable<any> {
    const URI = this.baseUrl + '/notifications/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  GET ONE MESSAGE
  public sendMessage(data: any): Observable<any> {
    const URI = this.baseUrl + '/send_notifications';
    return this.http.post<any>(URI, data, this.header);
  }

  //  EDIT MESSAGE
  public editMessage(data): Observable<any> {
    const URI = this.baseUrl + '/notifications/' + data.id;
    return this.http.patch<any>(URI, data, this.header);
  }

  // MESSAGE ACTIVATION
  public validateMessage(id: string): Observable<any> {
    const URI = this.baseUrl + '/notifications/' + id;
    return this.http.get<any>(URI, this.header);
  }

  //  DELETE MESSAGE
  public deleteMessage(id: string): Observable<any> {
    const URI = this.baseUrl + '/notifications/' + id;
    return this.http.delete<any>(URI, this.header);
  }
}
