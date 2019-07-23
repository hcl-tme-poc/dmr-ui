import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EligibilityCheckService } from '../../services/eligibility-check.service';
import { EligibilityCheckResponse } from '../../models/eligibility-check-response.model';
import { LoginService } from '../../services/login.service';
import { UserModel, UserEligibilityState } from '../../models/user.model';


@Component({
  selector: 'app-renew-users',
  templateUrl: './renew-users.component.html',
  styleUrls: ['./renew-users.component.css']
})
export class RenewUsersComponent implements OnInit {

  dl: string;
  dob: string;
  postalCode: string;
  trilliumNumber: string;
  now: Date;

  preEligible: boolean = false; 
  precheckMessage: EligibilityCheckResponse | undefined;

  componentState: UserEligibilityState | {precheck: boolean};

  currentUser: UserModel | {} = {};

  elifibilityMessage: EligibilityCheckResponse = this.eligibilityCheckService.eligibilityData;

  constructor(public loginService: LoginService, private eligibilityCheckService: EligibilityCheckService, 
    private route: ActivatedRoute, private router: Router) { }

  public ngOnInit() {
    this.now = new Date();

    let checkEligibilityParams = {};
    this.preEligible = false;
    this.precheckMessage = undefined;

    this.loginService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    if(this.loginService.currentUser) {
      checkEligibilityParams = {...this.loginService.currentUser, precheck: false};

      this.eligibilityCheckService.preCheckDriver(this.loginService.currentUser.driverLicenseNumber, this.loginService.currentUser.trilliumNumber,
      this.loginService.currentUser.postalCode, this.loginService.currentUser.dob).subscribe((res) => {
      this.precheckMessage = res as EligibilityCheckResponse;
      this.preEligible = this.precheckMessage.message === 'You are eligible to renew your driver’s license';
    });
    
    }

    
    this.router.navigate(['/renew-eligible']);

    
  }

}
