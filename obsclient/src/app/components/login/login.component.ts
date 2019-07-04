import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NotificationService } from "../../services/notification.service";

// import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form: FormGroup;
  previousUrl;
  unauthorized = false;
  createForm() {
    this.form = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  // Function to disable form
  disableForm() {
    this.form.controls.email.disable(); // Disable username field
    this.form.controls.password.disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls.email.enable(); // Enable username field
    this.form.controls.password.enable(); // Enable password field
  }

  constructor(
    private notifyService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {
    this.createForm();
  }

  processLogin() {
    const credential = {
      username: this.form.get("email").value, // Username input field
      password: this.form.get("password").value // Password input field
    };
    this.authService.login(credential).subscribe((data: any) => {
      const userType = data.user.userType;
      if (userType === "admin") {
        if (!data.success) {
          this.messageClass = "alert alert-danger";
          this.message = data.status;
          this.processing = false; // Enable submit button
          this.enableForm(); // Enable form for editting
        } else {
          this.messageClass = "alert alert-success";
          this.message = data.status;
          //  store user data in local storeg
          this.authService.storeAdminUserData(data.token, data.user);
          // After 1 seconds, redirect to dashboard page
          setTimeout(() => {
            this.router.navigate(["/bid-change-requests"]);
          }, 1000);
        }
      } else if (userType === "supplierUser") {
        if (!data.success) {
          this.messageClass = "alert alert-danger";
          this.message = data.status;
          this.processing = false; // Enable submit button
          this.enableForm(); // Enable form for editting
        } else {
          this.messageClass = "alert alert-success";
          this.message = data.status;
          //  store user data in local storeg
          this.authService.storeSupUserData(data.token, data.user);
          // After 1 seconds, redirect to dashboard page
          setTimeout(() => {
            this.router.navigate(["/supdashboard"]);
          }, 1000);
        }
        // this.notifyService.showSuccess("Successfully  Login !!");
      } else if (userType === "publicUser") {
        if (!data.success) {
          this.messageClass = "alert alert-danger";
          this.message = data.status;
          this.processing = false; // Enable submit button
          this.enableForm(); // Enable form for editting
        } else {
          this.messageClass = "alert alert-success";
          this.message = data.status;
          this.authService.storeUserData(data.token, data.user);
          setTimeout(() => {
            this.router.navigate(["/dashboard"]);
          }, 1000);
        }
      }
    },
    err => {
      this.unauthorized = true;
    }
    ), setTimeout(() => {
      this.unauthorized = false;
    }, 1000);
  }
  ngOnInit() {}
}
