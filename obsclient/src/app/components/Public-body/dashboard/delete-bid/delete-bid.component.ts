import { Component, OnInit } from "@angular/core";
import { BidService } from "../../../../services/bid.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-delete-bid",
  templateUrl: "./delete-bid.component.html",
  styleUrls: ["./delete-bid.component.css"]
})
export class DeleteBidComponent implements OnInit {
  message;
  messageClass;
  foundBid = false;
  processing = false;
  bid;
  currentUrl;

  constructor(
    private bidService: BidService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // Function to delete blogs
  deletebid() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.bidService.deleteBid(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = "alert alert-danger"; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = "alert alert-success"; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to blog page
        setTimeout(() => {
          this.router.navigate(["/dashboard"]); // Route users to blog page
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve blog
    this.bidService.getSingleBid(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = "alert alert-danger"; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        // Create the blog object to use in HTML
        this.bid = {
          bid_name: data.bid.bid_name, // Set title
          bid_number: data.bid.bid_number,
          bid_postdate: data.bid.bid_postdate, // Set body
          bid_deadline: data.bid.bid_deadline, // Set body
          bid_desc: data.bid.bid_desc, // Set body
          // Set body
        };
        this.foundBid = true; // Displaly blog window
      }
    });
  }
}
