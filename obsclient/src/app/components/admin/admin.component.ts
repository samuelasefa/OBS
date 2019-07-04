import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form: FormGroup;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }
  ngOnInit() {

  }

}
