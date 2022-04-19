import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
declare let notify: any;
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Check School';

  constructor(public auth: AuthService, private router: Router) {
   }

  ngOnInit(): void {
    // this.pusherService.channel.bind('form-submitted', (data: any) => {
    //   alert(JSON.stringify(data));
    // });
    const notis = new notify('params');
  }
}
