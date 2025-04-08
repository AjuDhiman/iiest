import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LandingpageComponent } from 'src/app/pages/landingpage/landingpage.component'
import { authGuard, consumerAuthGuard } from 'src/app/shared/gaurds/auth.guard';
import { routeGuard } from 'src/app/shared/gaurds/route.guard';
import { fbo_roles, empRegister_roles, caseList_roles, bookSaleRoles, director_roles } from 'src/app/utils/config';
import { UserAccountComponent } from 'src/app/pages/user-account/user-account.component';
import { CaseListComponent } from 'src/app/pages/operation/case-list/case-list.component';
import { OperationformComponent } from 'src/app/pages/operation/operationform/operationform.component';
import { SignupComponent } from 'src/app/pages/HR/signup/signup.component';
import { FbonewComponent } from 'src/app/pages/sales/fboproduct/fbonew/fbonew.component';
import { FbolistComponent } from 'src/app/pages/sales/fbolist/fbolist.component';
import { EmployeelistComponent } from 'src/app/pages/HR/employeelist/employeelist.component';
import { LmsComponent } from 'src/app/pages/lms/lms.component';
import { BatchListComponent } from 'src/app/pages/Training/batch-list/batch-list.component';
import { MainPageComponent } from 'src/app/pages/main-page/main-page.component';
import { OnboardVerificationComponent } from './pages/onboard-verification/onboard-verification.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './pages/refund-policy/refund-policy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ClientListComponent } from './pages/sales/client-list/client-list.component';
import { InvoiceListComponent } from './pages/accounts/invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './pages/coworks/create-invoice/create-invoice.component';
import { ConsumerDashboardComponent } from './pages/consumer-pages/consumer/consumer-dashboard/consumer-dashboard.component';
import { ConsumerMainPageComponent } from './pages/consumer-pages/consumer/consumer-main-page/consumer-main-page.component';
import { ConsumerOthersOptionComponent } from './pages/consumer-pages/consumer/consumer-others-option/consumer-others-option.component';
import { ConsumerInvoiceComponent } from './pages/consumer-pages/consumer/consumer-invoice/consumer-invoice.component';
import { ConsumerNotificationsComponent } from './pages/consumer-pages/consumer/consumer-notifications/consumer-notifications.component';
import { ConnectWithUsComponent } from './pages/consumer-pages/consumer/connect-with-us/connect-with-us.component';
import { ConsumerShopDetailsComponent } from './pages/consumer-pages/consumer/consumer-shop-details/consumer-shop-details.component';
import { UpdateBoCustomerComponent } from './pages/sales/update-bo-customer/update-bo-customer.component';
import { ShippingPolicyComponent } from './pages/shipping-policy/shipping-policy.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
// import { ConsumerHomeComponent } from './pages/consumer-pages/consumer-home-page/consumer-home';

const routes: Routes = [
  { path: '', component: LandingpageComponent }, // Default route
  { path: 'main', component: LandingpageComponent},
  { path: 'verifyonboard/:type/:id', component: OnboardVerificationComponent},
  { path: 'mainpage', component: MainPageComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'refund-policy', component: RefundPolicyComponent},
  { path: 'shipping-policy', component: ShippingPolicyComponent},
 { path: 'terms-and-conditions', component: TermsAndConditionsComponent},
 { path: 'contact-us', component: ContactUsComponent},

 { path: 'home', component: HomeComponent, canActivate:[authGuard]},
  { path: 'user', component: UserAccountComponent, canActivate:[authGuard]},
  { path: 'caselist', component: CaseListComponent, canActivate:[authGuard,routeGuard], data: {allowedRoles:caseList_roles}},
  { path: 'recipientlist', component: CaseListComponent, canActivate:[authGuard,routeGuard], data: {allowedRoles:caseList_roles}},
  { path: 'batchlist/caselist', component: CaseListComponent, canActivate:[authGuard,routeGuard], data: {allowedRoles:caseList_roles}},
  { path: 'batchlist', component: BatchListComponent, canActivate:[authGuard,routeGuard], data: {allowedRoles:caseList_roles}},
  { path: 'auditlist', component: BatchListComponent, canActivate:[authGuard,routeGuard], data: {allowedRoles:caseList_roles}},
  { path: 'auditlist/caselist', component: CaseListComponent, canActivate:[authGuard,routeGuard], data: {allowedRoles:caseList_roles}},
  { path: 'caselist/operationform/:product/:id', component: OperationformComponent, canActivate:[authGuard,routeGuard], data: {allowedRoles:caseList_roles}},
  { path: 'empregister', component: SignupComponent, canActivate:[authGuard, routeGuard], data: {allowedRoles:empRegister_roles}},
  { path: 'fbo', component: FbonewComponent, canActivate:[authGuard, routeGuard], data: {allowedRoles:bookSaleRoles}},
  { path: 'fbolist', component: FbolistComponent, canActivate:[authGuard, routeGuard], data: {allowedRoles:fbo_roles, allowedPanels: ['FSSAI Supervisor Panel', 'FSSAI Relationship Panel']}},
  //client list route opens client list component only alowed to director Roles 
  { path: 'clientlist', component: ClientListComponent, canActivate:[authGuard, routeGuard], data: {allowedRoles:director_roles}},
  { path: 'invoicelist', component: InvoiceListComponent, canActivate:[authGuard, routeGuard], data: {allowedRoles: director_roles}},
  { path: 'createinvoice', component: CreateInvoiceComponent, canActivate:[authGuard, routeGuard], data: {allowedRoles: director_roles, allowedPanels: ['DPIIT Sales Panel']}},
  { path: 'emplist', component: EmployeelistComponent, canActivate:[authGuard, routeGuard], data: {allowedRoles:empRegister_roles}},
  { path: 'lms', component: LmsComponent, canActivate:[authGuard]},
  { path: 'update-bo-customer/:customerId', component: UpdateBoCustomerComponent },


//  { path: 'consumer-home', component: ConsumerHomeComponent, canActivate:[authGuard]},
 { path: 'consumer-main-page', component:ConsumerMainPageComponent,canActivate:[consumerAuthGuard]},
 { path: 'consumer-dashboard', component: ConsumerDashboardComponent,canActivate:[consumerAuthGuard]},
 { path: 'consumer-other-option', component: ConsumerOthersOptionComponent,canActivate:[consumerAuthGuard]},
 { path: 'consumer-invoice', component: ConsumerInvoiceComponent,canActivate:[consumerAuthGuard]},
 { path: 'consumer-notification', component: ConsumerNotificationsComponent,canActivate:[consumerAuthGuard]},
 { path: 'consumer-chat', component: ConnectWithUsComponent,canActivate:[consumerAuthGuard]},
 { path: 'consumer-shop-details', component:ConsumerShopDetailsComponent,canActivate:[consumerAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
