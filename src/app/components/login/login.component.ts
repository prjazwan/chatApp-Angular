import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.controls['username'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    // console.log('Submitted');
    this.showSpinner = true;
    this.authService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        this.tokenService.SetToken(res.token);
        this.loginForm.reset();
        setTimeout(() => {
          this.router.navigate(['streams']);
        }, 1000);
      },
      (err) => {
        this.showSpinner = false;
        console.log(err);
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }
}
