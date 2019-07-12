import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: UserModel;

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.currentUser = this.loginService.currentUser;
  }

}
