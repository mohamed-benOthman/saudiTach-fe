import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../edit-personal/password.validation';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {UserApiService} from '../../services/user-api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css', '../edit-personal/edit-personal.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public editFormGeralGroup: FormGroup;
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar,
      private translate: TranslateService,
      private userApiService: UserApiService,

  ) {
    this.editFormGeralGroup = this.formBuilder.group({

          oldPassword: new FormControl(null),
          password: new FormControl(null),
          confirmPassword: new FormControl(null),

        }, {
      validator: PasswordValidation.MatchPassword
    }
    );
  }



  ngOnInit() {
  }
  navigateBack() {
    this.router.navigate(['profile']);
  }
    reset() {
      if (this.editFormGeralGroup.value.confirmPassword.length < 6) {
          this.snackBar.open(`${this.translate.instant('profile.editPersonal.password_minimum')}`, this.translate.instant('profile.editPersonal.close'), {
              duration: 4000,
              panelClass: ['error-snack']
          });
      } else {
          console.log('dsadsa');
          const dataUser = localStorage.getItem('current_user');
          const data = {
              email: JSON.parse(dataUser).email,
              password: this.editFormGeralGroup.value.confirmPassword,
              oldPassword: this.editFormGeralGroup.value.oldPassword
          };

          console.log(data);
          this.userApiService.changePassword(data).subscribe((res) => {
                  this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateSuccess')}`, this.translate.instant('profile.editPersonal.close'), {
                      duration: 4000,
                      panelClass: ['success-snack']
                  });
                  this.router.navigate(['profile']);

              },
           err => {
               this.snackBar.open(`${this.translate.instant('profile.editPersonal.password_error')}`, this.translate.instant('profile.editPersonal.close'), {
                   duration: 4000,
                   panelClass: ['error-snack']
               });
           }   );
      }
    }

}
