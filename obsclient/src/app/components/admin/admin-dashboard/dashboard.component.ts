import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BidService } from 'src/app/services/bid.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: "app-admindashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  dashForm: FormGroup;
  messageClass: string;
  message: any;
  processing = false;
  appliedbid;
  bid;
  applys;
  createForm() {}
  OnaddSupplierList() {}
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private bidService: BidService
  ) {
    this.createForm();
  }
  OnPermit() {
    // permite function is going here?
    window.alert("permit is clicked");
  }
  OnDeny() {
    window.alert("deny is clicked");
  }

  ngOnInit() {
    this.bidService.getApplyedBids().subscribe(data => {
      console.log(data);
      this.bid = data.applys.bid;
      this.applys = data.applys;
    });
  }
}
