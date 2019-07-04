import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-edit-supprofile",
  templateUrl: "./edit-supprofile.component.html",
  styleUrls: ["./edit-supprofile.component.css"]
})
export class EditSupprofileComponent implements OnInit {
  supuser;
  user;
  messageClass;
  message;
  id;
  email;
  processing = false;
  currentUrl;
  loading: true;
  form: FormGroup;
  createForm() {
    this.form = this.formBuilder.group({
      companyname: ["", Validators.required],
      tin_no: ["", Validators.required],
      email: ["", Validators.required],
      phone_no: ["", Validators.required],
      username: ["", Validators.required]
    });
  }
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
  }
  UpdateProfile() {

    this.authService.editUser(this.form.value).subscribe(data => {
        if (!data.success) {
          this.messageClass = "alert alert-danger"; // Set error bootstrap class
          this.message = data.message; // Set error message
          this.processing = false; // Unlock form fields
        } else {
          this.messageClass = "alert alert-success"; // Set success bootstrap class
          this.message = data.message; // Set success message
          // After two seconds, navigate back to blog page
          setTimeout(() => {
            this.router.navigate(["/supprofile"]); // Navigate back to route page
          }, 2000);
        }
      });
  }
  OnBack() {
    this.router.navigate(["/supprofile"]);
  }
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.supuser = profile.supplier;
      this.user = profile;
      this.form.get("companyname").setValue(this.supuser.companyName);
      this.form.get("tin_no").setValue(this.supuser.tinNumber);
      this.form.get("email").setValue(this.user.email);
      this.form.get("phone_no").setValue(this.user.phoneNumber);
      this.form.get("username").setValue(this.user.username);
    });
  }
}
