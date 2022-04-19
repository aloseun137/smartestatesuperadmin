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

export class BillingService {

public baseUrl = environment.baseUrl;
public header =  {headers: {Authorization: `Bearer ${localStorage.auth_tkn}`}};
private decodedToken;

constructor(private http: HttpClient,  private UserProfile: ProfileService) {
this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
}

// BILLING ITEMS

  // CREATE ITEMS
  public createItems(data): Observable<any> {
  const URI = this.baseUrl + '/billings';
  return this.http.post<any>(URI, data, this.header);
}

//  GET ALL BILLIING ITEMS
  public getAllItems(): Observable<any> {
  const URI = this.baseUrl + '/billings';
  return this.http.get<any>(URI, this.header);
}

//  BILLING ITEMS BY USER
public getItemsByUser(id: string): Observable<any> {
  const URI = this.baseUrl + '/billings/' + id;
  return this.http.get<any>(URI, this.header);
}

//  GET ONE Items
public getBillingItemById(id: string): Observable<any> {
  const URI = this.baseUrl + '/billings/' + id;
  return this.http.get<any>(URI, this.header);
}

//  EDIT Items
public editBillingItems(data): Observable<any> {
  const URI = this.baseUrl + '/billings/' + data.id;
  return this.http.patch<any>(URI, data, this.header);
}

//  BILLING ITEMS ACTIVATE STATUS
public billingItemsStatus(data): Observable<any> {
  const URI = this.baseUrl + '/billings/' + data.id;
  return this.http.patch<any>(URI, data, this.header);
}

//  DELETE Items
public deleteBillingItems(id: string): Observable<any> {
  const URI = this.baseUrl + '/billings/' + id;
  return this.http.get<any>(URI, this.header);
}

  // INVOICE

  // CREATE AN INVOICE
  public createInvoice(data): Observable<any> {
    const URI = this.baseUrl + '/invoices';
    return this.http.post<any>(URI, data, this.header);
  }

  //  GET ALL INVOICE
    public getAllInvoice(): Observable<any> {
    const URI = this.baseUrl + '/invoices';
    return this.http.get<any>(URI, this.header);
  }

  public getAllInvoicePaginate(id): Observable<any> {
    const URI = this.baseUrl + '/invoices?page='+id;
    return this.http.get<any>(URI, this.header);
  }

    //  INVOICE BY USER
    public getInvoiceByUser(id: string): Observable<any> {
      const URI = this.baseUrl + '/invoices_per_user/' + id;
      return this.http.get<any>(URI, this.header);
  }

    //  GET ONE INVOICE
    public getInvoiceById(id: string): Observable<any> {
      const URI = this.baseUrl + '/invoices/' + id;
      return this.http.get<any>(URI, this.header);
  }

    //  BILLING ITEMS ACTIVATE STATUS
    public InvoiceStatus(data): Observable<any> {
    const URI = this.baseUrl + '/invoiceStatus/' + data.id;
    return this.http.patch<any>(URI, data, this.header);
  }

      //  DELETE Items
    public deleteInvoice(id: string): Observable<any> {
      const URI = this.baseUrl + '/invoices/' + id;
      return this.http.get<any>(URI, this.header);
  }

    // WALLET

  //  GET WALLET HISTORY
    public getWalletHistory(): Observable<any> {
    const URI = this.baseUrl + '/wallet_histories';
    return this.http.get<any>(URI, this.header);
  }

    //  GET WALLET BALANCE
    public getWalletBanace(): Observable<any> {
      const URI = this.baseUrl + '/wallets';
      return this.http.get<any>(URI, this.header);
    }

    public getWalletByUser(id: string): Observable<any> {
      const URI = this.baseUrl + '/wallet_histories/' + id;
      return this.http.get<any>(URI, this.header);
  }

    //  PAYMENTS BY USER
    public getPaymentByUser(id: string): Observable<any> {
      const URI = this.baseUrl + '/payment_by_user/' + id;
      return this.http.get<any>(URI, this.header);
  }

}
