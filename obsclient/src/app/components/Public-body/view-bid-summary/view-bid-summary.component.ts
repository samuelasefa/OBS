import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: "app-view-bid-summary",
  templateUrl: "./view-bid-summary.component.html",
  styleUrls: ["./view-bid-summary.component.css"]
})
export class ViewBidSummaryComponent implements OnInit {
  currentBidId;
  bid;
  searchText;
  applications;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bidService: BidService
  ) {}

  ngOnInit() {
    this.currentBidId = this.activatedRoute.snapshot.params["id"];
    this.bidService.getSingleBid(this.currentBidId).subscribe(
      resp => {
        console.log("first response ", resp);
        this.bid = resp.bid;
        this.bidService
          .gitBidApplicationList(this.currentBidId)
          .subscribe(resp => {
            console.log("The second response", resp);
            this.applications = resp;
            this.getWinningValue();
          });
      },
      err => {}
    );
  }

  getWinningValue() {
    // for(let )
    var allApplications = this.applications.top.concat(
      this.applications.medium.concat(this.applications.least)
    );
    // console.log('All applicaitons', allApplications)
    var winningApply;
    // console.log('winner id', this.bid.winner._id)
    for (var i = 0; i < allApplications.length; i++) {
      if (this.bid.winner._id === allApplications[i].applier._id) {
        winningApply = allApplications[i];
        break;
      } else {
        winningApply = "none";
      }
    }
    // console.log('winnig ', winningApply)
    return winningApply.amount;
  }
}
