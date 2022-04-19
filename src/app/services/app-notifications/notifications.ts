import { Router } from "@angular/router";
import {interval} from 'rxjs';
import { NotificationsService } from './../notificationsapiCall/notifications.service';
import { AuthService } from './../../auth/auth.service';
declare let notify2: any;
declare let $: any;

export class AppNotifications {

    public notifications: any[] = [];
    public authUser: any;
    private interval = 1; // Time interval in seconds between api calls to get notification
  
    constructor(private authService: AuthService,
                private notificationService: NotificationsService,
                // private _shared: SharedService,
                private __router_: Router) {
      if (this.authService.isAuthenticated()) {
        interval(1000 * 60 * this.interval).subscribe((val) => {
          this.getUnreadNotifications();
        });
      }
    }
  
    public getUnreadNotifications() {
      if (!this.authService.isAuthenticated()) {
        return;
      }
      this.authUser = this.authService.getAuthUser();            
      this.notificationService.getUnreadNotifications().subscribe(res => {
        const $shake = $('#shake');
        const $blink = $('#blink');
        if (res.length) {
          $shake.addClass('m-animate-shake');
          $blink.addClass('m-animate-blink');
          setTimeout(() => $shake.removeClass('m-animate-shake'), 1500);
          setTimeout(() => $blink.removeClass('m-animate-blink'), 1500);
        }
        this.notifications = res;
        console.log(this.notifications, 'test notification');
        
        // this.notifications.forEach(notification => {
        //   const type = notification.type.split('v1\\')[1];
        //   notification.type = type;
        //   switch (type) {
        //     case 'NewBidderNotification':
        //       notification.text = notification.data.venue.name ? `New Bid for ${notification.data.venue.name}` : `New Bid for ${notification.data.venue}`;
        //       break;
        //     case 'BidApproveNotification':
        //       notification.text = notification.data.venue.name ? `Your bid for ${notification.data.venue.name} has been approved` : `Your bid for ${notification.data.venue} has been approved`;
        //       break;
        //     case 'BidDeclineNotification':
        //       notification.text = notification.data.venue.name ? `Your bid for ${notification.data.venue.name} has been declined` : `Your bid for ${notification.data.venue} has been declined`;
        //       break;
        //     case 'UserBiddingNotification':
        //       notification.text = notification.data.venue.name ? `You placed a bid for ${notification.data.venue.name}` : `You placed a bid for ${notification.data.venue}`;
        //       break;
        //     case 'NewDateBookingNotification':
        //       notification.text = notification.data.venue.name ? `New booking for ${notification.data.venue.name}` : `New booking for ${notification.data.venue}`;
        //       break;
        //     case 'UserBookingNotification':
        //       notification.text = notification.data.venue.name ? `You booked ${notification.data.venue.name}` : `You booked ${notification.data.venue}`;
        //       break;
        //     case 'NewUserCreated':
        //       notification.text = 'Welcome to VenueLog';
        //       break;
        //     case 'VenueRejectedNotification':
        //       notification.text = `Your venue, ${notification.data.venue.name} has been declined`;
        //       break;
        //     case 'VenueApprovalNotification':
        //       notification.text = `Your venue, ${notification.data.venue.name} has been approved`;
        //       break;
        //     case 'VenueDisableNotification':
        //       notification.text = `You sent a request to disable ${notification.data.venue_name}`;
        //       break;
        //     case 'VenueDisabledNotification':
        //       notification.text = `Your request to disable ${notification.data.venue_name} has been approved `;
        //       break;
        //     case 'VenueEnableNotification':
        //       notification.text = `You sent a request to enable ${notification.data.venue_name}`;
        //       break;
        //     case 'VenueEnabledNotification':
        //       notification.text = `Your request to enable ${notification.data.venue_name} has been approved `;
        //       break;
        //   }
        // });
      });
    }
  
    private goToAction(unread) {
      const type = unread.type.split('\\')[2];          
      $('#close_dyna').trigger('click');
      switch (type) {
         case 'residentVisitorPassStatus':
           this.__router_.navigateByUrl('/visitor_pass');
           break;
         case 'adminRepliesComplain':
          this.__router_.navigateByUrl('/complaint');
           break;
         case 'adminSendsMessage':
          this.__router_.navigateByUrl('/message');
          break;
         case 'UserBiddingNotification':
         case 'BidDeclineNotification':
         case 'BidApproveNotification':
           this.__router_.navigateByUrl('/user/biddings');
           break;
         case 'UserBookingNotification':
           this.__router_.navigateByUrl('/user/bookings/');
           break;
         case 'VenueRejectedNotification':
         case 'VenueApprovalNotification':
           this.__router_.navigateByUrl('/user/venues/' + unread.data.venue.slug + '-' + unread.data.venue.id);
       }
    }
    // VenueRejectedNotification
    // VenueApprovalNotification
  
    public markAsRead(notification) {
      this.notificationService.markAsRead(notification.id).subscribe(res => {
        this.getUnreadNotifications();
        this.goToAction(notification);
      });
    }
  }