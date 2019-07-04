import { Component, OnInit } from '@angular/core';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-pub-notification',
  templateUrl: './pub-notification.component.html',
  styleUrls: ['./pub-notification.component.css']
})
export class PubNotificationComponent implements OnInit {
  notifications
  constructor(
    private bidService: BidService
  ) { }

  ngOnInit() {
    this.bidService.getNotifications()
      .subscribe(
        resp => {
          this.notifications = resp.notifications
          console.log(resp)
        },
        err => {

        }
      )
  }

}
