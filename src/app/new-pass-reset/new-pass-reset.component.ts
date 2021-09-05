import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserApiService } from '../services/user-api.service';
import { BaseService } from '../services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordValidation } from './password.validation';

@Component({
  selector: 'app-new-pass-reset',
  templateUrl: './new-pass-reset.component.html',
  styleUrls: ['./new-pass-reset.component.css']
})
export class NewPassResetComponent implements OnInit {
  public resetFormGeralGroup: FormGroup;
  public updating: boolean;
  public token: string;
  public error = false;
  constructor(
    private formBuilder: FormBuilder,
    private userApiService: UserApiService,
    private baseService: BaseService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.paramMap.get('token');
    this.userApiService.checkResetToken(this.token).subscribe(
        (resp: any) => {
          this.error = false;
        },
        err => {
          this.error = true;
        }



    );



    this.resetFormGeralGroup = this.formBuilder.group({
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  ngOnInit() {

  }

  reset() {
    console.log(this.route.snapshot.paramMap.get('token'));
    const data = {
      resetToken: this.route.snapshot.paramMap.get('token'),
      password: this.resetFormGeralGroup.value.password

    };


    console.log(data);

    this.baseService.startLoading();
    this.updating = true;

    this.userApiService.resetPassword(data).subscribe(resp => {
      const result: any = resp;
      this.baseService.stopLoading();
      this.updating = false;

      this.snackBar.open(`${this.translate.instant('reset.success')}`, this.translate.instant('reset.close'), {
        duration: 4000,
        panelClass: ['success-snack']
      });
      this.router.navigate(['login']);
    }, error => {
      this.baseService.stopLoading();

      this.updating = false;
      this.snackBar.open(`${this.translate.instant('reset.error')}`, this.translate.instant('reset.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      });
    });
  }
}
