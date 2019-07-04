import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BidService } from "../../../services/bid.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
@Component({
  selector: "app-sup-dashboard",
  templateUrl: "./sup-dashboard.component.html",
  styleUrls: ["./sup-dashboard.component.css"]
})
export class SupDashboardComponent implements OnInit {
  p;
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
  constructor(
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private bidService: BidService
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
          Validators.maxLength(30)
        ])
      ],
      bid_number: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ])
      ],
      bid_desc: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ])
      ],
      file: ["", Validators.required],
      bid_postdate: ["", Validators.required],
      bid_deadline: ["", Validators.required]
    });
  }
  enableFormNewBidForm() {
    this.form.get("bid_name").enable();
    this.form.get("bid_number").enable();
    this.form.get("bid_postdate").enable();
    this.form.get("bid_deadline").enable();
    this.form.get("bid_desc").enable();
    // this.form.get(this.selectedfile).enable();
  }

  disableFormNewBidForm() {
    this.form.get("bid_name").disable();
    this.form.get("bid_number").disable();
    this.form.get("bid_postdate").disable();
    this.form.get("bid_deadline").disable();
    this.form.get("bid_desc").disable();
    // this.form.get(this.selectedfile).disable();
  }
  // Function to go back to previous page
  goBack() {
    // window.location.reload(); // Clear all variable states
    this.router.navigate(["/dashboard"]);
  }
  // onfile upload
  OnfileSelected(event) {
    this.selectedfile = event.target.files[0];
  }
  // bid form submitions
  onBidSubmit() {
    const bid = {
      bid_name: this.form.get("bid_name").value,
      bid_number: this.form.get("bid_number").value,
      bid_postdate: this.form.get("bid_postdate").value,
      bid_deadline: this.form.get("bid_deadline").value,
      bid_desc: this.form.get("bid_desc").value,
      // status: this.form.get("status", this.selectedStatus).value,
      // file: this.form.get(this.selectedfile).value,
      userType: this.email
    };
    this.bidService.newBid(bid).subscribe(data => {
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
    }, 4000);
  }
  // Function to get all posted bids from the database
  getAllBids() {
    // Function to GET all bids from database
    this.bidService.getAllBids().subscribe(data => {
      this.bidPosts = data.bids;
      // Assign array to use in HTML
      this.bidService.getAllAppliedBids().subscribe(applies => {
        console.log("all bids", this.bidPosts);
        for (let i = 0; i < this.bidPosts.length; i++) {
          const bidId = this.bidPosts[i]._id;
          // console.log(this.bidPosts[i]._id)
          for (let j = 0; j < applies.apply.length; i++) {
            if (bidId === applies.apply[j].bid) {
              //  console.log('applied')
              this.bidPosts[i].isResolved = true;
            } else {
              //  console.log('Not applied')
              this.bidPosts[i].isResolved = false;
            }
          }
        }
        console.log("The updated bid ", this.bidPosts);
      });
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      console.log(data);
      this.email = data.email;
    });
    this.getAllBids();
  }
}
