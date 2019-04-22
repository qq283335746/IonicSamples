import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/services/api-client.service';
import { SR } from 'src/app/models/SR';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiClientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('login--returnUrl:' + this.returnUrl);
  }

  get f() { return this.loginForm.controls; }

  async onSubmit() {
    console.log('onLogin--');
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    var result = await this.apiService.LoginAsync(this.f.username.value, this.f.password.value);
    console.log('result--' + result);

    if (!result || result.trim() === '') {
      this.apiService.alert(null, null, SR.LoginInvalidError);
      return;
    }

    if (!this.returnUrl || this.returnUrl.trim() == '/') {
      this.router.navigateByUrl('/404');
      return;
    }

    if (this.returnUrl.indexOf("?") > -1) this.returnUrl += '&token=' + result;
    else this.returnUrl += '?token=' + result;

    this.apiService.alert(null, null, SR.LoginSuccessAndRedirect);
    await this.apiService.delay(1000);

    window.location.href = this.returnUrl;
    
  }

}
