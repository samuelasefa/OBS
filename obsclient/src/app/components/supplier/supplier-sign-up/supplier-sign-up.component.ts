import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: "app-supplier-sign-up",
  templateUrl: "./supplier-sign-up.component.html",
  styleUrls: ["./supplier-sign-up.component.css"]
})
export class SupplierSignUpComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;
  processing = false;
  unauthorized = false;
  // Form Controle for priveasies
  enableFormNewBidForm() {
    this.form.get("companyname").enable();
    this.form.get("tin_no").enable();
    this.form.get("username").enable();
    this.form.get("email").enable();
    this.form.get("phone_no").enable();
    this.form.get("password").disable();
    this.form.get("usertype").disable();
    // this.form.get(this.selectedfile).enable();
  }

  disableFormNewBidForm() {
    this.form.get("companyname").disable();
    this.form.get("tin_no").disable();
    this.form.get("username").disable();
    this.form.get("email").disable();
    this.form.get("phone_no").disable();
    this.form.get("password").disable();
    this.form.get("usertype").disable();

    // this.form.get(this.selectedfile).disable();
  }
  // Function to validate e-mail is proper format
  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { validateEmail: true }; // Return as invalid email
    }
  }
  createForm() {
    this.form = this.formBuilder.group({
      companyname: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)
        ])
      ],
      tin_no: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)
        ])
      ],
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)
        ])
      ],
      email: [
        "",
        Validators.compose([Validators.required, this.ValidateEmail])
      ],
      phone_no: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)
        ])
      ],
      userType: ["supplierUser"]
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private authServie: AuthService,
    private router: Router,
    private notifiy: NotificationService
  ) {
    this.createForm();
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
  OnRegister() {
    const credential = {
      companyName: this.form.get("companyname").value,
      tinNumber: this.form.get("tin_no").value,
      username: this.form.get("username").value,
      email: this.form.get("email").value,
      phoneNumber: this.form.get("phone_no").value,
      password: this.form.get("password").value,
      userType: "supplierUser"
    };
    console.log(credential);
    this.authServie.registerUser(credential).subscribe(
      resp => {
        if (!resp.success) {
          this.messageClass = "alert alert-danger";
          this.message = resp.status;
          this.processing = false;
          // this.enableFormNewBidForm();
        } else {
          this.messageClass = "alert alert-success";
          this.message = resp.status;
          setTimeout(() => {
            this.processing = false;
            this.form.reset();
          }, 1000);
          this.router.navigate(["/login"]);
        }
      },
      err => {
        this.unauthorized = true;
      }
    ),
      setTimeout(() => {
        this.unauthorized = false;
      }, 1000);
  }
  ngOnInit() {}
}
