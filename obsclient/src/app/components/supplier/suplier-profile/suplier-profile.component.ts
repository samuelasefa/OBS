import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: "app-suplier-profile",
  templateUrl: "./suplier-profile.component.html",
  styleUrls: ["./suplier-profile.component.css"]
})
export class SuplierProfileComponent implements OnInit {
  companyName;
  tinNumber;
  email;
  profile;
  phoneNumber;
  username;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.profile = profile;
      this.companyName = profile.supplier.companyName;
      this.tinNumber = profile.supplier.tinNumber;
      this.username = profile.username;
      this.phoneNumber = profile.phoneNumber;
      this.email = profile.email;
    });
  }
}
