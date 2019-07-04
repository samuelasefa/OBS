import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BidService } from "../../../../services/bid.service";
@Component({
  selector: "app-sup-edit-bid",
  templateUrl: "./sup-edit-bid.component.html",
  styleUrls: ["./sup-edit-bid.component.css"]
})
export class SupEditBidComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  bid;
  loading = true;
  currentUrl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bidService: BidService,
    private router: Router
  ) {}
  // Function to go back to previous page
  goBack() {
    this.router.navigate(["/dashboard"]);
  }
  updateBidSubmit() {
    this.processing = true;
    this.bidService.editBid(this.bid).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = "alert alert-danger"; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = "alert alert-success"; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(["/dashboard"]); // Navigate back to route page
        }, 2000);
      }
    });
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
}
