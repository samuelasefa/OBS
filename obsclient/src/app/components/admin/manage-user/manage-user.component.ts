import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-manage-user",
  templateUrl: "./manage-user.component.html",
  styleUrls: ["./manage-user.component.css"]
})
export class ManageUserComponent implements OnInit {
  pubdata;
  supdata;
  constructor(private authService: AuthService) {}

  getPublicuser() {
    this.authService.getAllPublicData().subscribe(data => {
      this.pubdata = data.pubusers;
    });
  }
  getAllSupplierList() {
    this.authService.getAllSupplierList().subscribe(data => {
      this.supdata = data.supusers;
    });
  }

  ngOnInit() {
    this.getPublicuser();
    this.getAllSupplierList();
  }
}
