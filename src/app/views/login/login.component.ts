import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {


  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authen: AuthenticationService,
  ) {
    // if(this.authen.loggedIn == true){
    //   this.router.navigate(['/dashboard']);
    // }
  }

  ngOnInit() {
    // this.authen.login('admin','123456'); 
    // this.authen.logout;
    this.buildLoginForm();
    console.log(this.authen.loggedIn);
  }


  //-------------- build login form -----------

  loginForm: FormGroup;
  loginValue: any;
  submitted = false;

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get value() { return this.loginForm.controls; }

  // ---------------login--------------

  onSubmit() {
    this.submitted = true;
    this.loginValue = this.loginForm.value;

    if (this.loginForm.invalid) {
      return;
    }

    console.log('loginValue', this.loginValue);

    this.authen.login(this.loginValue.username, this.loginValue.password).subscribe(r => {
      if (r['success'] == true) {
        this.router.navigate(['/dashboard']);
      }
    })
  }

}
