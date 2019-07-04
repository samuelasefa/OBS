import { Component, OnInit } from '@angular/core';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-unresolved-bids',
  templateUrl: './unresolved-bids.component.html',
  styleUrls: ['./unresolved-bids.component.css']
})
export class UnresolvedBidsComponent implements OnInit {
  unresolvedBids;
  didCallApi = false;
  success = false
  constructor(
    private bidService: BidService
  ) { }

  ngOnInit() {
    this.bidService.getUnresolvedBids()
      .subscribe(
        resp => {
          console.log(resp.bids);
          this.unresolvedBids = resp.bids;
        },
        err => {

        }
      )
  }

  alertBidder(bidderId, bidId) {
    this.didCallApi = true;
    console.log('the bidder id is', bidId);
    this.bidService.alertBidder({ bidderId: bidderId, bidId: bidId })
      .subscribe(
        resp => {
          this.success = true;
          console.log(resp);
        },
        err => {
          this.success = false;
        }
      )
  }

}
