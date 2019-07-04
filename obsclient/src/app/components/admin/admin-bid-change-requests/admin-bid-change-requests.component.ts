import { Component, OnInit } from '@angular/core';
import { BidService } from 'src/app/services/bid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-bid-change-requests',
  templateUrl: './admin-bid-change-requests.component.html',
  styleUrls: ['./admin-bid-change-requests.component.css']
})
export class AdminBidChangeRequestsComponent implements OnInit {
  requestsList;
  constructor(
    private bidService: BidService,
    private router: Router
  ) { }

  ngOnInit() {
    this.bidService.getBidChangeRequests()
      .subscribe(
        requests => {
          this.requestsList = requests;
          console.log(this.requestsList);
        }
      )
  }

  viewDetail(id){
    this.router.navigate(['/bid-change-request-detail/'+id])
  }

}
