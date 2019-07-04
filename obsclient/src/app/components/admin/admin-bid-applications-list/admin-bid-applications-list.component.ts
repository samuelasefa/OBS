import { Component, OnInit } from '@angular/core';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-admin-bid-applications-list',
  templateUrl: './admin-bid-applications-list.component.html',
  styleUrls: ['./admin-bid-applications-list.component.css']
})
export class AdminBidApplicationsListComponent implements OnInit {
  bidApplications;
  respSuccess = false;
  respFailure = false;
  message;
  constructor(private bidService: BidService) { }

  ngOnInit() {
    this.bidService.getBidApplications()
      .subscribe(
        resp => {
          this.bidApplications = resp;
          console.log(resp)
        }
      )
  }
  acceptApplication(id, index){
    this.bidService.processBidApplication(id, 'accepted')
      .subscribe(
        resp => {
          this.respSuccess = true;
          this.message = 'Succesfully accepted bid application';
          console.log(resp)
          this.bidApplications.splice(index, 1);
        },
        err => {
          this.respFailure = true;
          this.message = 'Error while accepting application'
        }
      )
  }

  rejectApplication(id, index){
    this.bidService.processBidApplication(id, 'rejected')
      .subscribe(
        resp => {
          this.respSuccess = true;
          this.message = 'Succesfully rejected application';
          this.bidApplications.splice(index, 1);
        },
        err => {
          this.respFailure = true;
          this.message = 'Error while rejecting application'
        }
      )
  }

}
