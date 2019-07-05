import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
form: FormGroup = new FormGroup({
  password: new FormControl(''),
  confirm: new FormControl('')
});
message;
messageClass;
processing;
token
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

processPasswordUpdate(){
    this.authService.updatePassword(this.token, this.form.value)
      .subscribe(
        resp => {
          console.log(resp)
        },
        err => {
          console.log(err);
        }
      )
  }
  ngOnInit() {
    this.token = this.activatedRoute.snapshot.params['token'];
  }
}
