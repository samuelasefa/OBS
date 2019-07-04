import { Component, OnInit } from '@angular/core';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-sup-notifications',
  templateUrl: './sup-notifications.component.html',
  styleUrls: ['./sup-notifications.component.css']
})
export class SupNotificationsComponent implements OnInit {
  notifications: any = [];
  constructor(
    private bidService: BidService
  ) { }

  ngOnInit() {
    this.bidService.getNotifications()
      .subscribe(
        resp => {
          this.notifications = resp.notifications;
          this.notifications.reverse();
          console.log(this.notifications)
        },
        err => {

        }
      );
  }

}
