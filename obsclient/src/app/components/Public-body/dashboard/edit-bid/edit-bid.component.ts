import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BidService } from "../../../../services/bid.service";
import { forEach } from '@angular/router/src/utils/collection';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { PushNotificationService } from 'src/app/services/push-notification.service';
@Component({
  selector: "app-edit-bid",
  templateUrl: "./edit-bid.component.html",
  styleUrls: ["./edit-bid.component.css"]
})
export class EditBidComponent implements OnInit {
   readonly VAPID_PUBLIC =
    "BIADmoilncnT9V-FIikQpBNLL6_2mx0fvFBXKkyiYt1sDg3y_iMY_iu7aQ95d44ACYnSUMjjjKbJ0MIlsNlx6gI";
  messageClass;
  message;
  processing = false;
  bid;
  updatedFields = [];
  loading = true;
  currentUrl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bidService: BidService,
    private router: Router,
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private pushService: PushNotificationService
  ) { }
  // Function to go back to previous page
  goBack() {
    this.router.navigate(["/dashboard"]);
  }
  updateBidSubmit() {
    // this.processing = true;
    // console.log('Yest it is working')
    let updatedFieldsToSend = [];

    for (let i = 0; i < this.updatedFields.length; i++) {
      if (this.updatedFields[i] === 'bid_name') {
        updatedFieldsToSend.push({ bid_name: this.bid.bid_name })
      }
      else if (this.updatedFields[i] === 'bid_number') {
        updatedFieldsToSend.push({ bid_number: this.bid.bid_number });
      }
      else if (this.updatedFields[i] === 'bid_postdate') {
        updatedFieldsToSend.push({ bid_postdate: this.bid.bid_postdate });
      }
      else if (this.updatedFields[i] === 'bid_deadline') {
        updatedFieldsToSend.push({ bid_deadline: this.bid.bid_deadline });
      }
      else if (this.updatedFields[i] === 'bid_desc') {
        updatedFieldsToSend.push({ bid_desc: this.bid.bid_desc });
      }
     if(updatedFieldsToSend.length > 0){
       updatedFieldsToSend.push({bid_id: this.bid._id})
      this.bidService.editBid(updatedFieldsToSend)
      .subscribe(
        resp => {
          if (!resp.success) {
            this.messageClass = "alert alert-danger"; // Set error bootstrap class
            this.message = resp.message; // Set error message
            this.processing = false; // Unlock form fields
          }
          else {
            this.messageClass = "alert alert-success"; // Set success bootstrap class
            this.message = resp.message; // Set success message
            setTimeout(() => {
              this.router.navigate(["/dashboard"]); // Navigate back to route page
            }, 2000);
          }
        }
      )
     }
    }

    // this.bidService.editBid(this.bid).subscribe(data => {
    //   console.log(data);
    //   if (!data.success) {
    //     this.messageClass = "alert alert-danger"; // Set error bootstrap class
    //     this.message = data.message; // Set error message
    //     this.processing = false; // Unlock form fields
    //   } else {
    //     this.messageClass = "alert alert-success"; // Set success bootstrap class
    //     this.message = data.message; // Set success message
    //     setTimeout(() => {
    //       this.router.navigate(["/dashboard"]); // Navigate back to route page
    //     }, 2000);
    //   }
    // });
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.bidService.getSingleBid(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = "Bid is not found";
      } else {
        this.bid = data.bid;
        this.loading = false;
      }
    });
  }
    sendNotification() {
    if (this.swUpdate.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC
        })
        .then(sub => {
          this.pushService.postSubscription(sub).subscribe();
        });
    }
  }
  onUpdate(fieldName) {
    console.log(fieldName)
    if (!this.updatedFields.includes(fieldName)) {
      this.updatedFields.push(fieldName);
    }
  }
}
