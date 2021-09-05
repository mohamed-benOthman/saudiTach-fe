import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { BaseService } from '../services/base.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  public resetFormGroup: FormGroup;
  public sending: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userApiService: UserApiService,
    public storageService: StorageService,
    private userService: UserService,
    private baseService: BaseService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private router: Router
  ) {
    this.resetFormGroup = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
  }

  send() {
    const resetData = this.resetFormGroup.value;
    const data = {
      email: this.resetFormGroup.value.email,
    };
    this.baseService.startLoading();

    this.sending = true;
    this.userApiService.forgotPassword(data).subscribe(resp => {
      const result: any = resp;

      this.sending = false;
      this.snackBar.open(`${this.translate.instant('forgot.success')}`, this.translate.instant('forgot.close'), {
        duration: 4000,
        panelClass: ['success-snack']
      });

    }, error => {
      this.baseService.stopLoading();

      this.sending = false;
      this.snackBar.open(`${this.translate.instant('forgot.notEmail')}`, this.translate.instant('forgot.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      });
    });
  }
}
