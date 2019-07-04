import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BidService } from 'src/app/services/bid.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: "app-appliers-list",
  templateUrl: "./appliers-list.component.html",
  styleUrls: ["./appliers-list.component.css"]
})
export class AppliersListComponent implements OnInit {
  applierList;
  currentBidId;
  searchText;
  markingResult;
  didCallApi = false;
  didCallApiUpdate = false;
  appliersCount = 0;
  Message;
  updateSuccessful;
  message;
  newDeadline;
  shouldReturn = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bidService: BidService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentBidId = this.activatedRoute.snapshot.params["id"];
    this.bidService.gitBidApplicationList(this.currentBidId).subscribe(
      resp => {
        var appliers = resp;
        console.log("top appliers", appliers.top);
        if (appliers.top.length > 0) {
          for (var i = 0; i < appliers.top.length; i++) {
            console.log("the applier ", appliers.top[i]);
            appliers.top[i].documentsFiles.bussinessLicense =
              this.bidService.domain +
              "bids/bid_document/" +
              appliers.top[i].documentsFiles.bussinessLicense;
            appliers.top[i].documentsFiles.cpoScan =
              this.bidService.domain +
              "bids/bid_document/" +
              appliers.top[i].documentsFiles.cpoScan;
            appliers.top[i].documentsFiles.bidInformation =
              this.bidService.domain +
              "bids/bid_document/" +
              appliers.top[i].documentsFiles.bidInformation;
            this.appliersCount += 1;
          }
        }

        if (appliers.medium.length > 0) {
          for (var i = 0; i < appliers.medium.length; i++) {
            appliers.medium[i].documentsFiles.bussinessLicense =
              this.bidService.domain +
              "bids/bid_document/" +
              appliers.medium[i].documentsFiles.bussinessLicense;
            appliers.medium[i].documentsFiles.cpoScan =
              this.bidService.domain +
              "bid_document/" +
              appliers.medium[i].documentsFiles.cpoScan;
            appliers.medium[i].documentsFiles.bidInformation =
              this.bidService.domain +
              "bids/bid_document/" +
              appliers.medium[i].documentsFiles.bidInformation;
            this.appliersCount += 1;
          }
        }

        if (appliers.least.length > 0) {
          for (var i = 0; i < appliers.least.length; i++) {
            appliers.least[i].documentsFiles.bussinessLicense =
              this.bidService.domain +
              "bids/bid_document/" +
              appliers.least[i].documentsFiles.bussinessLicense;
            appliers.least[i].documentsFiles.cpoScan =
              this.bidService.domain +
              "bids/bid_document/" +
              appliers.least[i].documentsFiles.cpoScan;
            appliers.least[i].documentsFiles.bidInformation =
              this.bidService.domain +
              "bids/bid_document/" +
              appliers.least[i].documentsFiles.bidInformation;
            this.appliersCount += 1;
          }
        }

        this.applierList = appliers;
        console.log(this.applierList);
      },
      err => {
        console.log(err);
      }
    );
  }

  markWinner(supplierId) {
    console.log("the supplierId is ", supplierId);
    this.didCallApi = true;

    this.bidService
      .handleResolveBidAction(this.currentBidId, { winner: supplierId })
      .subscribe(
        winner => {
          this.markingResult = true;
          setTimeout(() => {
            this.router.navigate(["/dashboard"]);
          }, 2000);
        },
        err => {
          this.markingResult = false;
        }
      );
  }
  doRepost() {
    console.log("doing it");
    console.log("new deadline ", this.newDeadline);
    console.log("current id", this.currentBidId);
    this.didCallApiUpdate = true;
    this.bidService
      .processRepost(this.currentBidId, { newDeadline: this.newDeadline })
      .subscribe(
        resp => {
          if (resp.success) {
            this.updateSuccessful = true;
            this.message = resp.message;
            this.shouldReturn = true;
          } else {
            this.updateSuccessful = false;
            this.message = resp.message;

            this.shouldReturn = false;
          }
        },
        err => {}
      );
  }

  navigateToDashboard() {
    this.router.navigate(["/dashboard"]);
  }
}
