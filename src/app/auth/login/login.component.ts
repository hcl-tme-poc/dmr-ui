import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginErrorMessage: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.initLoginForm();
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value)
      .subscribe(
        (val) => {
          this.loginErrorMessage = '';
          if(this.loginForm.value.loginId!=="" && this.loginForm.value.password!==""){
            this.router.navigate(['/home']);
          }
        },
        (err) => {
          this.loginErrorMessage = err;
        }
      );
  }

  get loginIdControl() { 
    return this.loginForm.get('loginId'); 
  }

  get passwordControl() { 
    return this.loginForm.get('password'); 
  }


  private initLoginForm(): FormGroup {

    return this.fb.group({
      loginId:  ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });

  }

}
