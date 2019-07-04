import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: "app-public-body-sign-up",
  templateUrl: "./public-body-sign-up.component.html",
  styleUrls: ["./public-body-sign-up.component.css"]
})
export class PublicBodySignUpComponent implements OnInit {
  form: FormGroup;
  message;
  userType;
  messageClass;
  processing = false;
  unauthorized = false;
  constructor(
    private notify: NotificationService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }
  createForm() {
    this.form = this.formBuilder.group(
      {
        public_body_name: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30)
          ])
        ],
        tin_no: ["", Validators.required],
        email: [
          "",
          Validators.compose([Validators.required, this.ValidateEmail])
        ],
        phone_no: [
          "",
          Validators.compose([Validators.required, Validators.maxLength(30)])
        ],
        con_per_name: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30)
          ])
        ],
        username: [
          "",
          Validators.compose([Validators.required, this.ValidateEmail])
        ],
        password: ["", Validators.required],
        usertype: ["", Validators.required]
      }
      // { validator: this.matchingPasswords("password", "confirm") }
    );
  }
  // validate email controler
  ValidateEmail(controls) {
    const regExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { validateEmail: true };
    }
  }
  // Function to disable the registration form
  disableForm() {
    this.form.controls.public_body_name.disable();
    this.form.controls.tin_no.disable();
    this.form.controls.email.disable();
    this.form.controls.phone_no.disable();
    this.form.controls.con_per_name.disable();
    this.form.controls.username.disable();
    this.form.controls.password.disable();
    this.form.controls.usertype.disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls.public_body_name.enable();
    this.form.controls.tin_no.enable();
    this.form.controls.email.enable();
    this.form.controls.phone_no.enable();
    this.form.controls.con_per_name.enable();
    this.form.controls.username.enable();
    this.form.controls.password.enable();
    this.form.controls.usertype.enable();
  }
  // matchingPasswords(password, confirm) {
  //   return (group: FormGroup) => {
  //   if (group.controls[password].value === group.controls[confirm].value) {
  //     return null;
  //   } else {
  //     return {'matchingPasswords': true };
  //   }
  // };
  // }
  onRegisterSubmit() {
    const credential = {
      publicBodyName: this.form.get("public_body_name").value,
      tinNumber: this.form.get("tin_no").value,
      email: this.form.get("email").value,
      phoneNumber: this.form.get("phone_no").value,
      username: this.form.get("username").value,
      password: this.form.get("password").value,
      userType: "publicUser"
    };
    console.log(credential);
    this.authService.registerUser(credential).subscribe(resp => {
      if (!resp) {
        this.messageClass = "alert alert-danger";
        this.message = resp.status;
        this.processing = false;
        // this.enableFormNewBidForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = resp.status;
        setTimeout(() => {
          this.processing = false;
          //  this.enableFormNewBidForm();
        }, 2000);
        this.router.navigate(["/login"]);
      }
    }, err => {
        this.unauthorized = true;
      }
    ),
      setTimeout(() => {
        this.unauthorized = false;
      }, 1000);
  }
  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      console.log(data);
    });
  }
}
