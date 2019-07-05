import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/Public-body/dashboard/dashboard.component";
import { SupplierSignUpComponent } from "./components/supplier/supplier-sign-up/supplier-sign-up.component";
import { PublicBodySignUpComponent } from "./components/Public-body/public-body-sign-up/public-body-sign-up.component";
import { ProfileComponent } from "./components/Public-body/profile/profile.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AuthGuard } from "./guards/auth.guard";
import { ForgotComponent } from "./components/forgot/forgot.component";
import { EditBidComponent } from "./components/Public-body/dashboard/edit-bid/edit-bid.component";
import { DeleteBidComponent } from "./components/Public-body/dashboard/delete-bid/delete-bid.component";
import { SuplierProfileComponent } from "./components/supplier/suplier-profile/suplier-profile.component";
import { AdminProfileComponent } from "./components/admin/admin-profile/admin-profile.component";
import { ManageUserComponent } from "./components/admin/manage-user/manage-user.component";
import { AdminDashboardComponent } from "./components/admin/admin-dashboard/dashboard.component";
import { EditProfileComponent } from "./components/Public-body/profile/edit-profile/edit-profile.component";
import { EditAdminprofileComponent } from "./components/admin/admin-profile/edit-adminprofile/edit-adminprofile.component";
import { EditSupprofileComponent } from "./components/supplier/suplier-profile/edit-supprofile/edit-supprofile.component";
import { SupApplyComponent } from "./components/supplier/dashboard/sup-apply/sup-apply.component";
import { AboutComponent } from "./components/about/about.component";
import { SupplierListComponent } from "./components/supplier/supplier-list/supplier-list.component";
import { AppliedComponent } from "./components/Public-body/applied/applied.component";
import { SupAppliedComponent } from "./components/supplier/sup-applied/sup-applied.component";
import { SupDashboardComponent } from "./components/supplier/dashboard/sup-dashboard.component";
import { SupNavbarComponent } from "./components/supplier/sup-navbar/sup-navbar.component";
import { SupEditBidComponent } from "./components/supplier/dashboard/sup-edit-bid/sup-edit-bid.component";
import { SupDeleteBidComponent } from "./components/supplier/dashboard/sup-delete-bid/sup-delete-bid.component";
import { ResetComponent } from './components/reset/reset.component';
import { PostEvalatutionComponent } from './components/supplier/post-evalatution/post-evalatution.component';
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
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "eval",
    component: PostEvalatutionComponent
  },
  {
    path: "reset/:token",
    component: ResetComponent
  },
  {
    path: "supapplied",
    component: SupAppliedComponent
  },
  {
    path: "supdelete-bid/:id",
    component: SupDeleteBidComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "supedit-bid/:id",
    component: SupEditBidComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "supnavbar",
    component: SupNavbarComponent
  },
  {
    path: "supdashboard",
    component: SupDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "applied",
    component: AppliedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "supplier-list",
    component: SupplierListComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "supapply/:id",
    component: SupApplyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admindashboard",
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manageuser",
    component: ManageUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "supprofile",
    component: SuplierProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "adminprofile",
    component: AdminProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-bid/:id",
    component: EditBidComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "bid-file/:id",
    component: UploadBidFileDocumentComponent
  },
  {
    path: "editprofile",
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editsupprofile",
    component: EditSupprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editadminprofile",
    component: EditAdminprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "delete-bid/:id",
    component: DeleteBidComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bid-change-requests',
    component: AdminBidChangeRequestsComponent
  },
  {
    path: 'bid-change-request-detail/:id',
    component: AdminChangeRequestDetailComponent
  },
  {
    path: 'bid-applications',
    component: AdminBidApplicationsListComponent
  },
  {
    path: 'review-applications/:id',
    component: AppliersListComponent
  },
  {
    path: 'bid-summary/:id',
    component: ViewBidSummaryComponent
  },
  {
    path: 'supplier/notifications',
    component: SupNotificationsComponent
  },
  {
    path: 'public/notifications',
    component: PubNotificationComponent
  },
  {
    path: 'unresolvedBids',
    component: UnresolvedBidsComponent
  },
  {
    path: "forgot",
    component: ForgotComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
    // canActivate: [AuthGuard]
  },
  {
    path: "supplier-signup",
    component: SupplierSignUpComponent
  },
  {
    path: "public-signup",
    component: PublicBodySignUpComponent
  },
  {
    path: "file-test",
    component: FileTestComponent
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
