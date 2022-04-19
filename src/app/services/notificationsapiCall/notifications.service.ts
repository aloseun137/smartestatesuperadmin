import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public baseUrl = environment.baseUrl;
  public header =  {headers: {Authorization: `Bearer ${localStorage.auth_tkn}`}};
  private decodedToken;

  constructor(private http: HttpClient) {
  }    
  //  GET ALL NOTIFICATIONS
    public getAllNotifications(): Observable<any> {
      const URI = this.baseUrl + '/user/notifications';
      return this.http.get<any>(URI, this.header);
    }

  public getUnreadNotifications(param?):  Observable<any> {
    const URI = this.baseUrl + '/user/notifications';
    return this.http.get<any>(URI, this.header);
    // return this.api.getRequest('user', 'notifications', new HttpParams({fromString: "unread=yes"}) );
  }

  // public getreadNotifications() {
  //   return this.api.getRequest('user', 'notifications', new HttpParams({fromString: "read=yes"}) );
  // }

  public markAsRead(notification_id) { 
  const params = new HttpParams()
  .set('read', notification_id)
    const URI = this.baseUrl + '/user/notifications';
    return this.http.get<any>(URI, {headers:this.header.headers, params: params});
  }
}
