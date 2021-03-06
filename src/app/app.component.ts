import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './services/login.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { OnlineService } from './services/online.service';
import { UserModel } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: UserModel;

  constructor(public dialog: MatDialog, public loginService: LoginService, 
        public onlineService: OnlineService,
        private route: ActivatedRoute, public router: Router) {

  }

  ngOnInit(): void {

    if(localStorage.getItem('userToken')) {
      this.loginService.setCurrentUser(JSON.parse(localStorage.getItem('userToken')));
    }else {
      this.loginService.setCurrentUser(undefined);
    }
    
  }


  doLogin() {
    this.router.navigate(['/login']);
  }

  doLogout() {
    localStorage.removeItem('userToken');
    this.loginService.logoff();
    this.router.navigate(['/home']);
  }

  goToDl() {

    let checkEligibilityParams = {};

    if(this.loginService.currentUser) {
      checkEligibilityParams = {...this.loginService.currentUser, precheck: false};
      delete checkEligibilityParams['token'];
    }

    this.router.navigate(['/license-eligibility', checkEligibilityParams ]);
  }
}
