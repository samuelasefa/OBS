import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import * as $ from 'jquery';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/Public-body/navbar/navbar.component';
import { SupNavbarComponent } from "./components/supplier/sup-navbar/sup-navbar.component";
import { DashboardComponent } from './components/Public-body/dashboard/dashboard.component';
import { SupplierSignUpComponent } from './components/supplier/supplier-sign-up/supplier-sign-up.component';
import { PublicBodySignUpComponent } from './components/Public-body/public-body-sign-up/public-body-sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './components/Public-body/profile/profile.component';
import { BidService } from './services/bid.service';
import { FileService } from "./services/file.service";
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { SearchPipe } from './search.pipe';
import { ForgotComponent } from './components/forgot/forgot.component';
import { EditBidComponent } from './components/Public-body/dashboard/edit-bid/edit-bid.component';
import { DeleteBidComponent } from './components/Public-body/dashboard/delete-bid/delete-bid.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PushNotificationService } from './services/push-notification.service';
import { HttpClientModule } from '@angular/common/http';
import { SuplierProfileComponent } from './components/supplier/suplier-profile/suplier-profile.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ManageUserComponent } from './components/admin/manage-user/manage-user.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from "./components/admin/admin-dashboard/dashboard.component";
import { DateValueAccessorModule } from "angular-date-value-accessor";
import {NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogService } from "./services/confirm-dialog.service";
import { EditProfileComponent } from './components/Public-body/profile/edit-profile/edit-profile.component';
import { EditSupprofileComponent } from './components/supplier/suplier-profile/edit-supprofile/edit-supprofile.component';
import { EditAdminprofileComponent } from './components/admin/admin-profile/edit-adminprofile/edit-adminprofile.component';
import { AboutComponent } from './components/about/about.component';
import { SupplierListComponent } from './components/supplier/supplier-list/supplier-list.component';
import { SearchlistPipe } from './searchlist.pipe';
import { AppliedComponent } from './components/Public-body/applied/applied.component';
import { SupAppliedComponent } from "./components/supplier/sup-applied/sup-applied.component";
import { SupDashboardComponent } from "./components/supplier/dashboard/sup-dashboard.component";
import { SupApplyComponent } from "./components/supplier/dashboard/sup-apply/sup-apply.component";
import { SupEditBidComponent } from "./components/supplier/dashboard/sup-edit-bid/sup-edit-bid.component";
import { SupDeleteBidComponent } from "./components/supplier/dashboard/sup-delete-bid/sup-delete-bid.component";
import { PostEvalatutionComponent } from './components/supplier/post-evalatution/post-evalatution.component';
import { FileUploadModule } from "ng2-file-upload";
import { ToastrModule } from 'ngx-toastr';
import { ResetComponent } from './components/reset/reset.component';
import { FileTestComponent } from './components/file-test/file-test.component';
import { UploadBidFileDocumentComponent } from './components/Public-body/dashboard/upload-bid-file-document/upload-bid-file-document.component';
import { AdminBidChangeRequestsComponent } from './components/admin/admin-bid-change-requests/admin-bid-change-requests.component';
import { AdminBidApplicationsListComponent } from './components/admin/admin-bid-applications-list/admin-bid-applications-list.component';
import { AppliersListComponent } from './components/Public-body/dashboard/appliers-list/appliers-list.component';
import { AdminChangeRequestDetailComponent } from './components/admin/admin-change-request-detail/admin-change-request-detail.component';
import { ViewBidSummaryComponent } from './components/Public-body/view-bid-summary/view-bid-summary.component';
import { SupNotificationsComponent } from './components/supplier/sup-notifications/sup-notifications.component';
import { UnresolvedBidsComponent } from './components/admin/unresolved-bids/unresolved-bids.component';
import { PubNotificationComponent } from './components/Public-body/pub-notification/pub-notification.component';
import {TextMaskModule } from 'angular2-text-mask';
@NgModule({
  declarations: [
    SupApplyComponent,
    SupEditBidComponent,
    SupDeleteBidComponent,
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SupNavbarComponent,
    DashboardComponent,
    SupplierSignUpComponent,
    PublicBodySignUpComponent,
    AdminComponent,
    FooterComponent,
    ProfileComponent,
    SearchPipe,
    SupDashboardComponent,
    ForgotComponent,
    EditBidComponent,
    DeleteBidComponent,
    AdminDashboardComponent,
    SuplierProfileComponent,
    AdminProfileComponent,
    ManageUserComponent,
    AdminNavbarComponent,
    EditProfileComponent,
    EditSupprofileComponent,
    SupAppliedComponent,
    EditAdminprofileComponent,
    AboutComponent,
    SupplierListComponent,
    SearchlistPipe,
    AppliedComponent,
    PostEvalatutionComponent,
    ResetComponent,
    FileTestComponent,
    UploadBidFileDocumentComponent,
    AdminBidChangeRequestsComponent,
    AdminBidApplicationsListComponent,
    AppliersListComponent,
    AdminChangeRequestDetailComponent,
    ViewBidSummaryComponent,
    SupNotificationsComponent,
    UnresolvedBidsComponent,
    PubNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    TextMaskModule,
    DateValueAccessorModule,
    // PopupModule.forRoot(),
    FileUploadModule,
    FlashMessagesModule,
    HttpModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-center",
      preventDuplicates: true,
      timeOut: 1000
    }),
    AngularFontAwesomeModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    FileService,
    AuthService,
    BidService,
    FlashMessagesService,
    AuthGuard,
    NotAuthGuard,
    PushNotificationService,
    ConfirmDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
