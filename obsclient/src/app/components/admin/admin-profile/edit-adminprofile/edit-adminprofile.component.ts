import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { BidService } from "src/app/services/bid.service";

@Component({
  selector: "app-edit-adminprofile",
  templateUrl: "./edit-adminprofile.component.html",
  styleUrls: ["./edit-adminprofile.component.css"]
})
export class EditAdminprofileComponent implements OnInit {
  messageClass;
  message;
  profile;
  id;
  username;
  email;
  admin;
  processing = false;
  currentUrl;
  loading = true;
  adminusers;
  editForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.creatForm();
  }
  creatForm() {
    this.editForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required]
    });
  }
  UpdateProfile() {
    this.processing = true;
    this.authService.editUser(this.editForm.value).subscribe(data => {
      console.log(data);
      if (!data.success) {
        this.messageClass = "alert alert-danger"; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = "alert alert-success"; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(["/adminprofile"]); // Navigate back to route page
        }, 2000);
      }
    });
  }
  OnBack() {
    this.router.navigate(["/adminprofile"]);
  }
  ngOnInit() {
    this.authService.getProfile().subscribe(res => {
      this.admin = res;
      this.adminusers = res.admin;
      console.log("data for user:", this.adminusers);
      this.editForm.get("firstName").setValue(this.adminusers.firstName);
      this.editForm.get("lastName").setValue(this.adminusers.lastName);
      this.editForm.get("email").setValue(this.admin.email);
      this.editForm.get("phoneNumber").setValue(this.admin.phoneNumber);
    });
  }
}
