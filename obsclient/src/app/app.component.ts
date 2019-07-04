import { Component, OnInit } from '@angular/core';
import {  SwUpdate } from '@angular/service-worker';
import { PushNotificationService } from './services/push-notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {
    this.reloadCatch();
  }

  constructor(
    private swUpdate: SwUpdate,
    pushService: PushNotificationService
  ) {
  }
  reloadCatch() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New Version available! would you like to update?')) {
          window.location.reload();
        }
      });
    }
  }
}
