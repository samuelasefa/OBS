import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.css"]
})
export class ForgotComponent implements OnInit {
  form: FormGroup;
  email;
  message;
  messageClass;
  processing;
  createForm() {
    this.form = this.formbuilder.group({
      email: ["", Validators.required]
    });
  }
  constructor(private formbuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.createForm();
  }
  OnForgotPassword() {
    const credential = {
      username: this.form.get("email").value // Username input field
    };
    console.log(credential);
    this.authService.sendForgotEmail().subscribe(data => {
      console.log(data);
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.status;
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.status;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }
    });
  }
  ngOnInit() {
    this.authService.getAllUser().subscribe(data => {
      this.email = data.user.email;
      console.log(data);
    });
  }
}
