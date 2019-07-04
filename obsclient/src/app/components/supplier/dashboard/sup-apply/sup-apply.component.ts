import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BidService } from '../../../../services/bid.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: "app-sup-apply",
  templateUrl: "./sup-apply.component.html",
  styleUrls: ["./sup-apply.component.css"]
})
export class SupApplyComponent implements OnInit {
  applyForm: FormGroup;
  companyname;
  message;
  applyer;
  messageClass;
  title;
  email;
  bidId;
  constructor(
    private authService: AuthService,
    private bidService: BidService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.creatForm();
  }
  creatForm() {
    this.applyForm = this.formBuilder.group({
      companyname: ["", Validators.compose([Validators.required])],
      transaction: ["", Validators.compose([Validators.required])],
      amount: ["", Validators.compose([Validators.required])],
      cpo: ["", Validators.compose([Validators.required])],
      business: ["", Validators.compose([Validators.required])]
    });
  }
  OnSend() {
    const apply = {
      bid: this.bidId,
      transaction: this.applyForm.get("transaction").value,
      companyName: this.companyname,
      // applyer: this.email,
      amount: this.applyForm.get('amount').value
    };
    console.log(apply);
    this.bidService.applyBid(apply).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() => {
          this.message = false;
          this.applyForm.reset();
        }, 4000);
        this.router.navigate(['/supapplied']);
      }
    });
  }
  ngOnInit() {
    // console.log('The bid id is: ',this.route.snapshot.params['id']);
    this.bidId = this.route.snapshot.params['id'];
    this.authService.getProfile().subscribe(data => {
      this.companyname = data.supplier.companyName;
      this.applyer = data.email;
    });
  }
}
