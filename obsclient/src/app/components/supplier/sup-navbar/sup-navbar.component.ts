import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: "app-sup-navbar",
  templateUrl: "./sup-navbar.component.html",
  styleUrls: ["./sup-navbar.component.css"]
})
export class SupNavbarComponent implements OnInit {
  email;
  navbars;
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {
  }
    // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    this.router.navigate(["/"]); // Navigate back to home page
  }
}
