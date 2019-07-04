import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BidService } from "../../../services/bid.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
import { ChangeDetectorRef } from "@angular/core";
import { Form } from "@angular/forms";
import { SwPush, SwUpdate } from '@angular/service-worker';
import { PushNotificationService } from 'src/app/services/push-notification.service';
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  readonly VAPID_PUBLIC =
    "BIADmoilncnT9V-FIikQpBNLL6_2mx0fvFBXKkyiYt1sDg3y_iMY_iu7aQ95d44ACYnSUMjjjKbJ0MIlsNlx6gI";
  p;
  formData: FormData = new FormData();
  imageToUpload: File;
  selectedfile;
  status: [];
  messageClass;
  message;
  newPost = false;
  loadingBids = false;
  form: FormGroup;
  bidPosts;
  commentForm;
  email;
  searchText;
  images: any = [];
  anyfiles: any = [];
  processing = false;
  user;
  constructor(
    private pushService: PushNotificationService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private bidService: BidService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.createNewBidForm();
  }

  BidForm() {
    this.newPost = true;
  }
  createNewBidForm() {
    this.form = this.formBuilder.group({
      bid_name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250)
        ])
      ],
      bid_number: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)
        ])
      ],
      bid_desc: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500)
        ])
      ],
      bid_inital: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)
        ])
      ],
      bid_deadline: ["", Validators.required]
    });
    //  { validators: this.dateLessThan('post', 'dead')}
  }

  // dateLessThan(post: string, dead: string) {
  onFileChange(event) {
    this.imageToUpload = event.target.files[0];
  }

  enableFormNewBidForm() {
    this.form.get("bid_name").enable();
    this.form.get("bid_number").enable();
    this.form.get("bid_deadline").enable();
    this.form.get("bid_desc").enable();
    this.form.get("bid_inital").enable();
  }

  disableFormNewBidForm() {
    this.form.get("bid_name").disable();
    this.form.get("bid_number").disable();
    this.form.get("bid_deadline").disable();
    this.form.get("bid_desc").disable();
    this.form.get("bid_inital").disable();
  }
  // Function to go back to previous page
  goBack() {
    // window.location.reload(); // Clear all variable states
    this.router.navigate(["/dashboard"]);
  }
  // onfile upload
  OnfileSelected(event) {
    this.formData.append("image", event.target.files[0]);
  }
  // bid form submitions
  onBidSubmit() {
    const bid = {
      bid_name: this.form.get("bid_name").value,
      bid_number: this.form.get("bid_number").value,
      bid_deadline: this.form.get("bid_deadline").value,
      bid_desc: this.form.get("bid_desc").value,
      // status: this.form.get("status", this.selectedStatus).value,
      bid_inital: this.form.get("bid_inital").value,
      publicBody: this.user._id
      // image: this.formData.append('image', this.imageToUpload)
    };
    this.bidService.newBid(bid).subscribe(data => {
      console.log("The data: ", data);
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableFormNewBidForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() => {
          this.newPost = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enableFormNewBidForm();
          this.router.navigate(["/bid-file/" + data.bid._id]);
        }, 2000);
      }
      this.getAllBids();
    });
  }
  // Reload Bid on current page
  reloadBids() {
    this.loadingBids = true; // Used to lock button
    // to get all bid
    this.getAllBids();
    setTimeout(() => {
      this.loadingBids = false; // Release button lock after four seconds
    }, 1000);
  }
  // Function to get all posted bids from the database
  getAllBids() {
    this.bidService.getAllBids().subscribe(data => {
      this.bidPosts = data.bids; // Assign array to use in HTML
    });
  }

  isOutOfDate(deadline) {
    const bidDeadline = Date.parse(deadline.toString());
    let outDated = false;
    if (bidDeadline < Date.now()) {
      outDated = true;
    }
    return outDated;
  }
  // markWinner(bidId) {
  //   this.bidService
  //     .handleResolveBidAction({ id: bidId })
  //     .subscribe(resolved => {
  //       console.log(resolved);
  //     });
  // }

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

  navigateToReviewApplications(bidId) {
    this.router.navigate(["/review-applications/" + bidId]);
  }
  navigateToSummary(bidId) {
    this.router.navigate(["/bid-summary/" + bidId]);
  }
  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.user = data.publicUser;
    });
    this.getAllBids();
  }
}
