import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  messageClass;
  message;
  username;
  email;
  processing = false;
  currentUrl;
  loading = true;
  editForm: FormGroup;
  publicuser;
  public;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.creatForm();
  }
  creatForm() {
    this.editForm = this.formBuilder.group({
      publicBodyName: ["", Validators.required],
      tinNumber: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required]
    });
  }
  UpdateProfile() {
    // here is the method of profile update is going
    this.authService.editUser(this.editForm.value).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger"; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = "alert alert-success"; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(["/profile"]); // Navigate back to route page
        }, 2000);
      }
    });
  }

  OnBack() {
    this.router.navigate(["/profile"]);
  }
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.publicuser = profile;
      console.log("public profile:", this.publicuser);
      this.public = profile.publicUser;
      console.log("publc data orginal", this.public)  ;
      this.editForm.get("publicBodyName").setValue(this.public.publicBodyName);
      this.editForm.get("email").setValue(this.publicuser.email);
      this.editForm.get("phoneNumber").setValue(this.publicuser.phoneNumber);
      this.editForm.get("tinNumber").setValue(this.public.tinNumber);
    });
  }
}
