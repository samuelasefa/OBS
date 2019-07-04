import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
// tslint:disable-next-line: variable-name
  public_body_name;
  email;
// tslint:disable-next-line: variable-name
  phone_no;
// tslint:disable-next-line: variable-name
  tin_no;
  contactpersonname;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    this.authService.getProfile().subscribe(profile => {
      console.log(profile);
      this.public_body_name = profile.publicUser.publicBodyName;
      this.tin_no = profile.publicUser.tinNumber;
      this.phone_no = profile.phoneNumber;
      this.contactpersonname = profile.publicUser.contactPersonName;
      this.email = profile.username;
    });
  }
}
