import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { EligibilityCheckService } from '../../services/eligibility-check.service';
import { EligibilityCheckResponse } from '../../models/eligibility-check-response.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  dl: string;
  dob: string;
  postalCode: string;
  trilliumNumber: string;
  now: Date;

  elifibilityMessage: EligibilityCheckResponse = this.eligibilityCheckService.eligibilityData;



  constructor(private route: ActivatedRoute, private router: Router,
    private eligibilityCheckService: EligibilityCheckService) { }

  ngOnInit() {

    this.now = new Date();

    this.route.paramMap.pipe(
      tap(val => {
        // console.log(' ********** route.paramMap',  val['params']);
      })
    ).subscribe((params) => {
      this.dl = params.get('dl');
      this.dob = params.get('dob');
      this.postalCode = params.get('postalCode');
      this.trilliumNumber = params.get('trilliumNumber');
    });

    if(!this.eligibilityCheckService.eligibilityData) {
      this.router.navigate(['/']);
    }

  }

}
