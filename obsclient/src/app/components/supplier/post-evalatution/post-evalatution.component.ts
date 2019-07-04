import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: "app-post-evalatution",
  templateUrl: "./post-evalatution.component.html",
  styleUrls: ["./post-evalatution.component.css"]
})
export class PostEvalatutionComponent implements OnInit {
  bid;
  amount;
  applys;
  constructor(
    public authService: AuthService,
    private bidService: BidService,
    private router: Router
  ) {}
  onLogoutClick() {
    this.authService.logout(); // Logout user
    this.router.navigate(["/"]); // Navigate back to home page
  }
  ngOnInit() {
    this.bidService.getApplyedBids().subscribe(data => {
    this.applys = data;
      // this.amount = data.apply.amount;
    console.log("this is single applyed for data featching", this.applys);
    });
  }
}
