import { Component, OnInit } from '@angular/core';
import { BidService } from 'src/app/services/bid.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private bidService: BidService) {}
  allTender() {
    this.bidService.getallout().subscribe (data => {
      console.log(data);
    });
  }
  subscribeToNotification() {

  }
  ngOnInit() {}
}
