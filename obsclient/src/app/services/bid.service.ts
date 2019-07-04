import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { stat } from 'fs';

@Injectable()
export class BidService {
  options;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: Http) {}

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-Type": "application/json", // Format set to JSON
        authorization: this.authService.authToken // Attach token
      })
    });
  }

  handleResolveBidAction(bidId, winner) {
    return this.http
      .post(this.domain + "bids/resolve/" + bidId, winner)
      .map(resp => resp.json());
  }
  // Function to delete a blog
  // Function to create a new bid post
  newBid(bid) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http
      .post(this.domain + "bids/newBid", bid, this.options)
      .map(res => res.json());
  }

  // Function to get all bids from the database
  getAllBids() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http
      .get(this.domain + "bids/allBids", this.options)
      .map(res => res.json());
  }
  // Function to get the bid using the id
  getSingleBid(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http
      .get(this.domain + "bids/singleBid/" + id, this.options)
      .map(res => res.json());
  }

  // Function to edit/update bid post
  editBid(bid) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http
      .post(this.domain + "bids/updateBid", bid, this.options)
      .map(res => res.json());
  }
  // Function to delete a bid
  deleteBid(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http
      .delete(this.domain + "bids/deletebid/" + id, this.options)
      .map(res => res.json());
  }
  applyBid(apply) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http
      .post(this.domain + "bids/apply", apply, this.options)
      .map(res => res.json());
  }

  // get all bid out side
  getallout() {
    return this.http.post(
      this.domain + "bids/allUnautherizedBids",
      this.options
    );
  }
  // Function to get all bids from the database

  getApplyedBids() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http
      .get(this.domain + "bids/applyedBids", this.options)
      .map(res => res.json());
  }

  // get single applyed bid
  getSelectedApplyedBid(id) {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + "bids/applyedBid/", id + this.options)
      .map(res => res.json());
  }

  getAllAppliedBids() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http
      .get(this.domain + "bids/allapplyedBids/", this.options)
      .map(res => res.json());
  }

  getBidApplications() {
    return this.http
      .get(`${this.domain}admin/bid_applications`)
      .map(resp => resp.json());
  }

  processBidApplication(bidId, status) {
    return this.http
      .patch(`${this.domain}admin/process_application/${bidId}`, {
        status: status
      })
      .map(resp => resp.json());
  }

  rejectBidChangeRequest(bid) {
    return this.http
      .post(`${this.domain}bids/rejectChangeRequest`, bid)
      .map(resp => resp.json());
  }

  uploadBidDocuments(applicationId, data) {
    return this.http
      .post(`${this.domain}file/submitBidInfo/${applicationId}`, data)
      .map(resp => resp.json());
  }

  getBidDocument(bidName) {
    return this.http.get(`${this.domain}bids/bid_document/${bidName}`);
  }

  gitBidApplicationList(bidId) {
    return this.http
      .get(`${this.domain}bids/getApplicantsList/${bidId}`)
      .map(resp => resp.json());
  }

  getBidChangeRequests() {
    return this.http
      .get(`${this.domain}bids/updateRequests`)
      .map(resp => resp.json());
  }

  getBidChangeReqeust(id) {
    return this.http
      .get(`${this.domain}bids/updateRequests/${id}`)
      .map(resp => resp.json());
  }

  approveBidChangeRequest(bid) {
    return this.http
      .post(`${this.domain}bids/approveChangeRequest`, bid)
      .map(resp => resp.json());
  }

  getNotifications() {
    this.createAuthenticationHeaders();
    return this.http
      .get(`${this.domain}bids/notifications`, this.options)
      .map(resp => resp.json());
  }

  getUnresolvedBids() {
    return this.http
      .get(`${this.domain}bids/unresolvedBids`)
      .map(resp => resp.json());
  }

  alertBidder(biderinfo) {
    return this.http
      .post(`${this.domain}bids/alert`, biderinfo)
      .map(resp => resp.json());
  }

  processRepost(bidId, info) {
    return this.http
      .post(`${this.domain}bids/repost/${bidId}`, info)
      .map(resp => resp.json());
  }
}
