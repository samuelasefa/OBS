import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { BidService } from "src/app/services/bid.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FileSelectDirective, FileUploader } from "ng2-file-upload";
import { FileService } from "../../../services/file.service";
import { saveAs } from "file-saver";
import { PushNotificationService } from '../../../services/push-notification.service';
import { SwUpdate, SwPush } from '@angular/service-worker';
@Component({
  selector: "app-applied",
  templateUrl: "./applied.component.html",
  styleUrls: ["./applied.component.css"]
})
export class AppliedComponent implements OnInit {
  createForm() {
    this.form = this.formBuilder.group({
      downfile: ["", Validators.compose([Validators.required])]
    });
  }
  form: FormGroup;
  applied;
  companyName;
  constructor(
    private bidService: BidService,
    private formBuilder: FormBuilder,
    private fileService: FileService,
  ) {
    this.createForm();
  }

  onSendFile() {
    const downfile = {
      downfile: this.form.get("downfile").value
    };
    console.log(downfile);
  }
  ngOnInit() {
    this.bidService.getAllAppliedBids().subscribe(data => {
    });
  }
}
