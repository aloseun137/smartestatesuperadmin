import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../environments/environment';
import { ProfileService } from '../profile/profile.service';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3";

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number;
  username: string;
}
@Injectable({
  providedIn: 'root'
})

export class WalletService {
  observer: any
  public baseUrl = environment.baseUrl;
  public header =  {headers: {Authorization: `Bearer ${localStorage.auth_tkn}`}};
  private decodedToken;
  publicKey: string = environment.FLUTTERWAVE_KEY;
  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}
  customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}

  customizations = {title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'}

  constructor(private http: HttpClient,
              private flutterwave: Flutterwave,
              private UserProfile: ProfileService) {
  this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
  }
   // WALLET
    public fundWallet(data): Observable<any> {
    const URI = this.baseUrl + '/pay';
    return this.http.post<any>(URI, data, this.header);
  }

  public payWithFlutterWave(data): Observable<any> {
    const paymentObservable = new Observable(observer => {
      this.observer = observer
      this.fundWallet(data).subscribe(response => {
        //  this.observer.next(data);
          const paymentData: InlinePaymentOptions = {
          public_key: this.publicKey,
          tx_ref: response.data,
          amount: data.amount,
          currency: 'NGN',
          payment_options: 'card,ussd',
          redirect_url: '',
          meta: this.meta,
          customer: this.customerDetails,
          customizations: this.customizations,
          callback: this.makePaymentCallback,
          onclose: this.closedPaymentModal,
          callbackContext: this
        }
        this.makeFlutterWavePayment(paymentData)
      }, error =>  this.observer.error(error)
      )
    });

    return paymentObservable;
  }

  makeFlutterWavePayment(data){
    this.flutterwave.inlinePay(data)
  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    this.verifyPayment(response).subscribe(response=>{
      this.flutterwave.closePaymentModal(5)
      this.observer.next(response)
    }, error => {
      this.flutterwave.closePaymentModal(5)
      this.observer.error(error)
    });
  }
  closedPaymentModal(): void {
    this.observer.next('close_payment_modal')
  }

  public verifyPayment (data): Observable<any> {
    const {status, transaction_id, tx_ref} = data;
    const paymentDetails = {status: status, transaction_id: transaction_id, tx_ref: tx_ref}
    // const path = $.param(paymentDetails);
    const URI = this.baseUrl + '/flutterwave/callback';
    // let body: HttpParams = new HttpParams();
    // body = body.append('status',status);
    // body = body.append('transaction_id', transaction_id);
    // body = body.append('tx_ref' , tx_ref);
    return this.http.post<any>(URI, paymentDetails, this.header);
  }

  //  GET WALLET HISTORY
    public getWalletHistory(): Observable<any> {
    const URI = this.baseUrl + '/wallet_history';
    return this.http.get<any>(URI, this.header);
  }

    //  GET Dashboard Analytics
    public dashboardAnalytics(): Observable<any> {
      const URI = this.baseUrl + '/dashboard_analytics';
      return this.http.get<any>(URI, this.header);
    }

  //  GET WALLET DETAILS
  public getWalletDetails(walletId: string): Observable<any> {
    const URI = this.baseUrl + '/wallet_details/' + walletId;
    return this.http.get<any>(URI, this.header);
  }

  //  GET WALLET BALANCE
  public getWalletBalance(): Observable<any> {
    const URI = this.baseUrl + '/wallet_balance';
    return this.http.get<any>(URI, this.header);
  }

    // PAYMENT
    public makePayment(data): Observable<any> {
    const URI = this.baseUrl + '/make_payment';
    return this.http.post<any>(URI, data, this.header);
  }

   //  GET PAYMENT BALANCE
   public getPaymentBalance(): Observable<any> {
    const URI = this.baseUrl + '/payment_balance';
    return this.http.get<any>(URI, this.header);
  }

  //  GET PAYMENT HISTORY
  public getPaymentHistory(): Observable<any> {
    const URI = this.baseUrl + '/payment_history';
    return this.http.get<any>(URI, this.header);
  }


  //  GET PAYMENT DETAILS
  public getPaymentDetails(paymentId: string): Observable<any> {
    const URI = this.baseUrl + '/payment_details/' + paymentId;
    return this.http.get<any>(URI, this.header);
  }

}
