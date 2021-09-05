import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserApiService } from 'src/app/services/user-api.service';
import { StorageService } from 'src/app/services/storage.service';
import { BaseService } from 'src/app/services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SocialUser, GoogleLoginProvider} from 'angularx-social-login';

import {AuthService} from 'angularx-social-login';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userApiService: UserApiService,
    public storageService: StorageService,
    private userService: UserService,
    private baseService: BaseService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private router: Router,
    private route:ActivatedRoute,
    private authService: AuthService
  ) {
    if (this.storageService.getAccessToken()) {
      this.router.navigate(['profiles']);
    }
    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }
  userEmail="";
  ngOnInit() {

  }

  login() {
    const loginData = this.loginFormGroup.value;
    this.baseService.startLoading();

    this.userApiService.login(loginData.email, loginData.password).subscribe((resp: any) => {
      const result: any = resp;


      this.storageService.setAccessToken(result.token);
      this.storageService.setCurrentProfile(resp);
      this.baseService.emitLoggedIn(true);
      this.userApiService.changeAuthenticated(true);
      this.userService.curUser = resp;
      this.baseService.emitProfile(resp);
      this.router.navigate(['profiles']);

    }, (error: any) => {
      this.baseService.stopLoading();
      if (error.status == 409) {
      this.snackBar.open(`${this.translate.instant('login.not_verified')}`, this.translate.instant('login.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      });
      } else
      if (error.status == 400) {
        this.baseService.stopLoading();
        this.snackBar.open(`${this.translate.instant('login.social')}`, this.translate.instant('login.close'), {
          duration: 4000,
          panelClass: ['error-snack']
        });
      } else {
      this.snackBar.open(`${this.translate.instant('login.error')}`, this.translate.instant('login.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      }); }
    });
  }

  socialLoginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.userApiService.loginGoogle(user.email).subscribe((resp: any) => {
        console.log(resp);
        const result: any = resp;
        this.storageService.setAccessToken(result.token);
        this.storageService.setCurrentProfile(resp);
        this.baseService.emitLoggedIn(true);
        this.userApiService.changeAuthenticated(true);
        this.userService.curUser = resp;
        this.baseService.emitProfile(resp);
        setTimeout(() => {

        }, 5000);
        window.location.reload();

      },
      err => {
        this.snackBar.open(`${this.translate.instant('login.error')}`, this.translate.instant('login.close'), {
          duration: 4000,
          panelClass: ['error-snack']
        });
      }

      );
      console.log(user);
    });

  }
  socialLogin() {

      this.userApiService.loginGoogle(this.userEmail).subscribe((resp: any) => {
            console.log(resp);
            const result: any = resp;
            this.storageService.setAccessToken(result.token);
            this.storageService.setCurrentProfile(resp);
            this.baseService.emitLoggedIn(true);
            this.userApiService.changeAuthenticated(true);
            this.userService.curUser = resp;
            this.baseService.emitProfile(resp);
            setTimeout(() => {

            }, 5000);
            window.location.reload();

          },
          err => {
            this.snackBar.open(`${this.translate.instant('login.error')}`, this.translate.instant('login.close'), {
              duration: 4000,
              panelClass: ['error-snack']
            });
          }

      );



  }
  socialLoginTwitter() {
    window.location.href = this.userApiService.twitterLogin();
  }
  socialLoginLinkedin() {
    window.location.href = this.userApiService.linkedinLogin();
  }
}
