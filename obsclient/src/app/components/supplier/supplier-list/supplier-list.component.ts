import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-supplier-list",
  templateUrl: "./supplier-list.component.html",
  styleUrls: ["./supplier-list.component.css"]
})
export class SupplierListComponent implements OnInit {
  suplists;
  user;
  searchText;
  p;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getAllSupplierList();
  }

  getAllSupplierList() {
    this.authService.getAllSupplierList().subscribe(data => {
      this.suplists = data;
      this.user = data.supplier;
    });
  }
}
