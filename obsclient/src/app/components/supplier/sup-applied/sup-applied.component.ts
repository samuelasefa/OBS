import { Component, OnInit } from "@angular/core";
import { saveAs } from "file-saver";
import { AuthService } from "src/app/services/auth.service";
import { BidService } from "src/app/services/bid.service";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FileService } from "src/app/services/file.service";
import {
  FileUploader,
  FileSelectDirective
} from "ng2-file-upload/ng2-file-upload";
import { Console } from '@angular/core/src/console';

const URL = "http://localhost:8080/file/submitBidInfo/";
@Component({
  selector: "app-sup-applied",
  templateUrl: "./sup-applied.component.html",
  styleUrls: ["./sup-applied.component.css"]
})
export class SupAppliedComponent implements OnInit {
  // uploader: FileUploader = new FileUploader({ url: uri });
  // attachmentList: any = [];
  public uploader: FileUploader;
  fromData = new FormData();
  amount = 0
  aboutToSubmit = false;
  currentApplyId;
  currentIndex;
  p;
  bid;
  applys;
  applicationSuccess = false;
  message;
  applicationFailure = false;
  constructor(
    private authService: AuthService,
    private bidService: BidService,
    private formBuilder: FormBuilder,
    private fileService: FileService
  ) { }
  ngOnInit() {


    this.bidService.getApplyedBids().subscribe(data => {
      // console.log(data);
      this.bid = data.applys.bid;
      var rawApplied = data.applys;
      for (var i = 0; i < rawApplied.length; i++) {
          console.log('the current ', rawApplied[i].bid.file);
          rawApplied[i].bid.file = this.bidService.domain + 'bids/bid_document/' + rawApplied[i].bid.file;
        
      }
      // console.log('the updated ', rawApplied);
      this.applys = rawApplied;
    });
  }
  openSubmissionPanel(applyId, currentIndex) {
    this.currentApplyId = applyId;
    this.currentIndex = currentIndex;
    console.log('The current index is ', currentIndex);
  }
  setupFileToUpload(event) {
    this.fromData.append('files', event.target.files[0], event.target.files[0]['name']);
    console.log(this.fromData.getAll('files'));
  }
  doSubmitBidInfo() {
    // console.log('The current amount is: ', this.amount)
    this.fromData.delete('amount');
    this.fromData.append('amount', this.amount.toString());
    console.log('The current amount from formdata ', this.fromData.get('amount'));
    this.bidService.uploadBidDocuments(this.currentApplyId, this.fromData)
      .subscribe(
        (resp: any) => {
          console.log('the response is ',resp)
          if(resp.success){
            this.applicationSuccess = true;
            this.applicationFailure = false
            this.applys[this.currentIndex].areDocumentsSubmitted = true;
            this.message = resp.message;
          }
          else {
            this.applicationFailure = true;
            this.applicationSuccess = false;
            this.message = resp.message;
          }
        },
        err => {
          this.applicationFailure = true;
          this.applicationSuccess = false;
          this.message = 'Error while submitting document';
        }
      )
  }
  getBidDocument(fileName) {
    this.bidService.getBidDocument(fileName)

  }
}



