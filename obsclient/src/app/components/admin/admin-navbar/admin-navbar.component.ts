import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
  styleUrls: ["./admin-navbar.component.css"]
})
export class AdminNavbarComponent implements OnInit {
  constructor(public authService: AuthService,
              private router: Router) {}

  ngOnInit() {}
  // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    this.router.navigate(["/login"]); // Navigate back to home page
  }
}
