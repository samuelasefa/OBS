import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: "app-admin-change-request-detail",
  templateUrl: "./admin-change-request-detail.component.html",
  styleUrls: ["./admin-change-request-detail.component.css"]
})
export class AdminChangeRequestDetailComponent implements OnInit {
  changeRequest;
  bidFields = [];
  approveResonse;
  respSuccess;
  respFailure;
  message;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bidService: BidService
  ) {}

  ngOnInit() {
    console.log("The id is: ", this.activatedRoute.snapshot.params["id"]);
    this.bidService
      .getBidChangeReqeust(this.activatedRoute.snapshot.params["id"])
      .subscribe(request => {
        this.changeRequest = request;
        console.log("changed fields ", this.changeRequest.changedFields);
        console.log(request);
      });
  }
  getField(index) {
    var theProp;
    for (var prop in index) {
      theProp = prop;
    }
    return theProp;
  }
  getValue(index) {
    return index[this.getField(index)];
  }

  doApproveChangeRequest() {
    var changedFieldNames = [];
    console.log("The bid before ", this.changeRequest.bid);
    for (var i = 0; i < this.changeRequest.changedFields.length; i++) {
      for (var prop in this.changeRequest.changedFields[i]) {
        this.changeRequest.bid[prop] = this.changeRequest.changedFields[i][
          prop
        ];
        this.changeRequest.bid.status = "approved";
      }
    }

    this.bidService
      .approveBidChangeRequest(this.changeRequest.bid)
      .subscribe(resp => {
        this.approveResonse = resp;
      });
  }
  rejectChangeRequist() {
    this.bidService.rejectBidChangeRequest(this.changeRequest.bid).subscribe(
      resp => {
        this.respSuccess = true;
        this.message = "Succesfully rejected Bid Change Requiste";
        // this.bidApplications.splice(index, 1);
      },
      err => {
        this.respFailure = true;
        this.message = "Error while rejecting requiste";
      }
    );
  }
}
