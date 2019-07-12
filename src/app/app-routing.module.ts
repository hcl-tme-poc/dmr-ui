import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { EligibilityCheckComponent } from './license/eligibility-check/eligibility-check.component';
import { ReportComponent } from './license/report/report.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'registration', component: NotImplementedComponent },
  { path: 'license-eligibility', component: EligibilityCheckComponent },
  { path: 'license-eligibility-report', component: ReportComponent },
  
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotImplementedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
