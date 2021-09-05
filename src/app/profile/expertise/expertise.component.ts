import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserApiService } from 'src/app/services/user-api.service';
import { BaseService } from 'src/app/services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';

import * as _ from 'lodash';


@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
})
export class ExpertiseComponent implements OnInit {

  public curUser: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userApiService: UserApiService,
    private baseService: BaseService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private userService: UserService,
    public storageService: StorageService
  ) {
    const profile = this.storageService.getCurrentProfile();
    if (profile) {
      if (profile.profile && (!profile.profile.country || !profile.profile.city)) {
        this.router.navigate(['profile/edit-personal']);
      }
    }
   }

  ngOnInit() {
    this.curUser = _.clone(this.storageService.getCurrentProfile());
  }


  update() {



    console.log(this.curUser);
    this.baseService.startLoading();
    this.userApiService.updateUser(this.curUser).subscribe((resp: any) => {
          this.userService.curUser = resp;
          console.log(resp);
          this.baseService.emitProfile(this.userService.curUser);
          this.storageService.setCurrentProfile(this.userService.curUser);
          // tslint:disable-next-line:max-line-length
          this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateSuccess')}`, this.translate.instant('profile.editPersonal.close'), {
            duration: 4000,
            panelClass: ['success-snack']
          });
          this.navigateBack();

        },
        error => {
          this.baseService.stopLoading();
          this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateError')}`, this.translate.instant('profile.editPersonal.close'), {
            duration: 4000,
            panelClass: ['error-snack']
          });
        }

    );


  }


  navigateBack() {
    this.router.navigate(['profile']);
  }

}
