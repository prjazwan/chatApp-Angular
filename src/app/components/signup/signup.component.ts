import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string;
  showSpinner = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  //getter for eassy access to form fields
  get username() {
    return this.signupForm.controls['username'];
  }
  get password() {
    return this.signupForm.controls['password'];
  }

  signupUser() {
    // console.log('submitted');
    // console.log(this.signupForm.value);
    // console.log(this.signupForm.controls);
    // console.log(this.signupForm.controls['username'])
    // console.log(this.signupForm.get('username'))
    this.authService.registerUser(this.signupForm.value).subscribe(
      (res) => {
        //  console.log(res)
        this.showSpinner = true;
        this.signupForm.reset();
        setTimeout(() => {
          this.router.navigate(['streams']);
        }, 2000);
      },
      (err) => {
        this.showSpinner = false;
        if (err.error.msg) {
          console.log(err);
          this.errorMessage = err.error.msg[0].message;
        }

        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }
}
