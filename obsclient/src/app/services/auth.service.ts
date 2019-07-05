import { Injectable } from '@angular/core';
// import { HttpClient} from '@angular/common/http';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  domain = "http://localhost:8080/";
  // domain = environment.domain;
  authToken;
  pubuser;
  supuser;
  adminuser;
  options;
  constructor(private http: Http) {}

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-Type": "application/json", // Format set to JSON
         authorization: this.authToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    const token = localStorage.getItem("token");
    this.authToken = token; // Get token and asssign to variable to be used elsewhere
  }

  // Function to register public user accounts
  registerUser(credential) {
    return this.http
      .post(this.domain + "users/signup", credential)
      .map(res => res.json());
  }
  registerAdminUser(){
  }
  // Function to check if username is taken
  // tslint:disable-next-line:variable-name
  checkPublicBodyName(public_body_name) {
    return this.http
      .get(
        this.domain + "authentication/checkPublicBodyName" + public_body_name
      )
      .map(res => res.json());
  }

  // Function to check if e-mail is taken
  checkEmail(email) {
    return this.http
      .get(this.domain + "authentication/checkEmail/" + email)
      .map(res => res.json());
  }

  // Function to login Publicuser
  login(credential) {
    return this.http
      .post(this.domain + "users/login", credential)
      .map(res => res.json());
  }
  // Function to login Publicuser
  adminlogin(adminuser) {
    return this.http
      .post(this.domain + "authentication/adminlogin", adminuser)
      .map(res => res.json());
  }

  // Function to store user's data in client local storage
  storeUserData(token, pubuser) {
    localStorage.setItem("token", token); // Set token in local storage
    localStorage.setItem("publicuser", JSON.stringify(pubuser));
    this.authToken = token; // Assign token to be used elsewhere
    this.pubuser = pubuser; // Set user to be used elsewhere
  }
  // Function to store user's data in client local storage
  storeSupUserData(token, supuser) {
    localStorage.setItem("token", token); // Set token in local storage
    localStorage.setItem("supplieruser", JSON.stringify(supuser));
    this.authToken = token; // Assign token to be used elsewhere
    this.supuser = supuser; // Set user to be used elsewhere
  }

  // Function to store user's data in client local storage
  storeAdminUserData(token, adminuser) {
    localStorage.setItem("token", token); // Set token in local storage
    localStorage.setItem("adminuser", JSON.stringify(adminuser));
    this.authToken = token; // Assign token to be used elsewhere
    this.adminuser = adminuser; // Set user to be used elsewhere
  }
// get all users service
  getAllUser() {
    return this.http.post(this.domain + 'users/allusers', this.options).map(res => res.json());
  }
  // send forget email to original gmail
  sendForgotEmail(email) {
    return this.http.post(this.domain + 'users/forgot', email).map(res => res.json());
  }
  updatePassword(token, passwords){
    return this.http.post(this.domain + 'users/reset/'+token, passwords).map(
      res => res.json()
    )
  }
  // Function to get user's profile data
  getProfile() {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + "users/profile", this.options)
      .map(res => res.json());
  }
  // get supplier profile
  getAllSupplierList() {
    return this.http
      .get(this.domain + "users/allsupplierusers", this.options)
      .map(res => res.json());
  }

  // get Public Data from database
  getAllPublicData() {
    return this.http
      .get(this.domain + "users/allpublic", this.options)
      .map(res => res.json());
  }

  editUser(updatedFields) {
    this.createAuthenticationHeaders();
    return this.http
      .put(this.domain + "users/editprofile" , updatedFields, this.options)
      .map(res => res.json());
  }

  loggedIn() {
    return tokenNotExpired();
  }

  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.pubuser = null; // Set publouser to null
    localStorage.clear(); // Clear local storage
  }
}
