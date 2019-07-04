import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
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
