import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { MatCarouselModule} from '@ngmodule/material-carousel';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { ShowOnDirtyErrorStateMatcher, ErrorStateMatcher } from '@angular/material/core';


import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { LicenseComponent } from './license/license.component';
import { EligibilityCheckComponent } from './license/eligibility-check/eligibility-check.component';
import { GuestPrecheckComponent } from './license/guest-precheck/guest-precheck.component';
import { QuestionerComponent } from './license/questioner/questioner.component';
import { ReportComponent } from './license/report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NotImplementedComponent,
    LicenseComponent,
    EligibilityCheckComponent,
    GuestPrecheckComponent,
    QuestionerComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule,
    MatCarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    AppRoutingModule
  ],
  entryComponents: [
    LoginComponent,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
