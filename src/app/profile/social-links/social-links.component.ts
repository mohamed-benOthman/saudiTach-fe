import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { UserApiService } from 'src/app/services/user-api.service';
import { BaseService } from 'src/app/services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.css']
})
export class SocialLinksComponent implements OnInit {

  public editFormGeralGroup: FormGroup;
  public curUser: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userApiService: UserApiService,
    private baseService: BaseService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private userService: UserService,
    private storageService: StorageService
  ) {
    const profile = this.storageService.getCurrentProfile();
    if (profile) {
      if (profile.profile && (!profile.country || !profile.city)) {
        this.router.navigate(['profile/edit-personal']);
      }
    }

    this.editFormGeralGroup = this.formBuilder.group({
      linkedin: new FormControl(null, [Validators.required]),
      twitter: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.curUser = _.clone(this.storageService.getCurrentProfile());
  }

  update() {

    this.curUser.twitter = this.editFormGeralGroup.value.twitter;
    this.curUser.linkedInProfile = this.editFormGeralGroup.value.linkedin;

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
