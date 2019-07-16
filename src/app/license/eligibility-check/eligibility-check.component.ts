import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserModel, UserEligibilityState } from '../../models/user.model';
import { EligibilityCheckService } from '../../services/eligibility-check.service';
import { EligibilityCheckResponse } from '../../models/eligibility-check-response.model';

@Component({
  selector: 'app-eligibility-check',
  templateUrl: './eligibility-check.component.html',
  styleUrls: ['./eligibility-check.component.css']
})
export class EligibilityCheckComponent implements OnInit {

  preEligible: boolean = false;  // true if first 4 values make user eligible

  componentState: UserEligibilityState | {pricheck: boolean};

  currentUser: UserModel | {} = {};

  precheckMessage: EligibilityCheckResponse | undefined;

  constructor(public loginService: LoginService, public eligibilityCheckService: EligibilityCheckService,
          private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.paramMap.pipe(
      tap(val => {
        // console.log(' ********** route.paramMap',  val['params'].pricheck);
      })
    ).subscribe((params) => {
      this.componentState = params['params'];
      this.componentState = {...this.componentState, pricheck: this.componentState.pricheck === 'true'}
    });

    this.loginService.currentUser$.subscribe(user => {

      this.currentUser = user;

    });
  }

  ngAfterViewInit() {

  }


  ngOnChanges(changeRecord) {

  }

  doPreCheck(event) {

    this.preEligible = false;
    this.precheckMessage = undefined;

    this.eligibilityCheckService.preCheckDriver(event.dlNumber, event.triulliumNumber,
            event.postalCode, event.dob).subscribe((res) => {

      this.precheckMessage = res as EligibilityCheckResponse;

      this.preEligible = this.precheckMessage.message === 'You are eligible to renew your driver’s license';

      this.componentState['driverLicenseNumber'] = event.dlNumber;
      this.componentState['trilliumNumber'] = event.triulliumNumber;
      this.componentState['postalCode'] = event.postalCode;
      this.componentState['dob'] = event.dob;
    });

  }

  questionsSubmitted(event) {

    this.eligibilityCheckService.checkEligibilityQuestioner(this.componentState['driverLicenseNumber'],
          'temp@mail.com', this.toTrueFalse(event.musclePain), this.toTrueFalse(event.poorDriving), 
          this.toTrueFalse(event.cardiacProblem),
          this.toTrueFalse(event.respiratoryProblem), this.toTrueFalse(event.eye), 
          this.toTrueFalse(event.hospitalized) )
    .subscribe((val) => {
      // console.log(' ********* eligibility:', val);

      this.router.navigate(['/license-eligibility-report', {
        dl: this.componentState['driverLicenseNumber'],
        trilliumNumber: this.componentState['trilliumNumber'],
        postalCode: this.componentState['postalCode'],
        dob: this.componentState['dob']
      }]);
    });

  }

  private toTrueFalse(val: string): string {
    return val === 'Yes' ? 'true' : 'false';
  }

  driverFormChanged(event) {

    this.preEligible = false;

    this.precheckMessage = undefined;

  }

  get showGuestPrecheck(): boolean {

    return !this.componentState.pricheck;

  }

}
