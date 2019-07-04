import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: "app-admin-profile",
  templateUrl: "./admin-profile.component.html",
  styleUrls: ["./admin-profile.component.css"]
})
export class AdminProfileComponent implements OnInit {
  username;
  admin;
  email;
  adminuser;
  firstName;
  lastName;
  phoneNumber;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.adminuser = profile;
      console.log(profile);
      this.admin = profile.admin;
      // this.username = profile.user.username;
      this.firstName = profile.admin.firstName;
      this.lastName = profile.admin.lastName;
      this.email = profile.email;
      this.phoneNumber = profile.phoneNumber;
    });
  }
}
