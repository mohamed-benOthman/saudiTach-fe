import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countries } from '../../../constants/countries';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserApiService } from 'src/app/services/user-api.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/services/base.service';
import { PasswordValidation } from './password.validation';

import * as _ from 'lodash';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-edit-personal',
  templateUrl: './edit-personal.component.html',
  styleUrls: ['./edit-personal.component.css']
})
export class EditPersonalComponent implements OnInit {

  public countries = countries;
  public cities = [];
  public editFormGeralGroup: FormGroup;
  public usernameValid = true;
  public curUser: any;
  public startedUserInfo: any;
  public userToCheck = JSON.parse(localStorage.getItem('current_user'));
  public activated;
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
    this.activated = profile.activated;
    if (profile) {
      if (profile.profile && (!profile.profile.country || !profile.profile.city)) {
        this.router.navigate(['profile/edit-personal']);
      }
    }

    this.editFormGeralGroup = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      /*username: new FormControl(null, [Validators.required]),
      oldPassword: new FormControl(null),
      password: new FormControl(null),
      confirmPassword: new FormControl(null),
      avatarLink: new FormControl(null)*/
    }, /*{
      validator: PasswordValidation.MatchPassword
    }*/
    );
  }

  ngOnInit() {
    this.curUser = this.storageService.getCurrentProfile();
    this.startedUserInfo = {
      firstName: this.curUser.firstName,
      lastName: this.curUser.lastName,
      country: this.curUser.country ? this.curUser.country : '',
      city: this.curUser.city ? this.curUser.city : '',
      avatarLink: this.curUser.avatarLink ? this.curUser.avatarLink : null,
      username: this.curUser.username
    };
    this.curUser.country ? this.loadCities(this.curUser.country) : '';
  }

  hasProfileChanges() {
    const beforeChanges = this.startedUserInfo;

    if (beforeChanges.firstName != this.curUser.firstName) {
      return true;
    }

    if (beforeChanges.lastName != this.curUser.lastName) {
      return true;
    }

    if (beforeChanges.city != this.curUser.city) {
      return true;
    }

    if (beforeChanges.country != this.curUser.country) {
      return true;
    }
    if (beforeChanges.avatarLink != this.curUser.avatarLink) {
      return true;
    }

   /* if (beforeChanges.avatarLink != this.curUser.profile.avatarLink) {
      return true;
    }*/

    return false;
  }

  hasPasswordChanges() {
    const passData = this.editFormGeralGroup.value;
    if (passData.oldPassword) {
      return true;
    }
    if (passData.password) {
      return true;
    }
    if (passData.confirmPassword) {
      return true;
    }
    return false;
  }

  updatePassword() {
    const passData = this.editFormGeralGroup.value;
    this.userApiService.updatePassword(passData.oldPassword, passData.password, passData.confirmPassword).subscribe(resp => {
      this.baseService.stopLoading();
      this.editFormGeralGroup.value.oldPassword = null;
      this.editFormGeralGroup.value.password = null;
      this.editFormGeralGroup.value.confirmPassword = null;
      this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateSuccess')}`, this.translate.instant('profile.editPersonal.close'), {
        duration: 4000,
        panelClass: ['success-snack']
      });
      this.navigateBack();
    }, error => {
      this.baseService.stopLoading();
      this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateError')}`, this.translate.instant('profile.editPersonal.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      });
    });
  }

  update() {
/*
    const data = {
      profile: {
        city: this.editFormGeralGroup.value.city,
        avatarLink: this.editFormGeralGroup.value.avatarLink,
        country: this.editFormGeralGroup.value.country,
        linkedin: this.userService.curUser.profile.linkedin,
        twitter: this.userService.curUser.profile.twitter,
        tellMore: this.curUser.profile.tellMore,
        yearsExperience: this.userService.curUser.profile.yearsExperience,
        workedStartup: this.userService.curUser.profile.workedStartup,
        commitFulltime: this.userService.curUser.profile.commitFulltime,
        willingRelocate: this.userService.curUser.profile.willingRelocate,
        equity: this.userService.curUser.profile.equity,
        whenStart: this.userService.curUser.profile.whenStart,
        frontend: this.userService.curUser.profile.frontend,
        backend: this.userService.curUser.profile.backend,
        design: this.userService.curUser.profile.design,
        database: this.userService.curUser.profile.database,
        devops: this.userService.curUser.profile.devops
      },
      id: this.userService.curUser._id,
      firstName: this.editFormGeralGroup.value.firstName,
      lastName: this.editFormGeralGroup.value.lastName,
      username: this.editFormGeralGroup.value.username,
    }
*/

    this.curUser.firstName = this.editFormGeralGroup.value.firstName;
    this.curUser.lastName = this.editFormGeralGroup.value.lastName;
    console.log(this.curUser);
    this.baseService.startLoading();
    this.userApiService.updateUser(this.curUser).subscribe((resp: any) => {
      this.userService.curUser = resp;
      console.log(resp);
      this.startedUserInfo = {
        firstName: this.curUser.firstName,
        lastName: this.curUser.lastName,
        country: this.curUser.country,
        city: this.curUser.city,

      };
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

/*    if (this.hasProfileChanges()) {
      this.userApiService.update(data).subscribe(resp => {

        this.userService.curUser.firstName = data.firstName;
        this.userService.curUser.lastName = data.lastName;
        this.userService.curUser.username = data.username;
        this.userService.curUser.profile.city = data.profile.city;
        this.userService.curUser.country = data.profile.country;
        this.userService.curUser.profile.avatarLink = data.profile.avatarLink;
        this.startedUserInfo = {
          firstName: this.curUser.firstName,
          lastName: this.curUser.lastName,
          country: this.curUser.profile.country,
          city: this.curUser.profile.city,
          avatarLink: this.curUser.profile.avatarLink,
          username: this.curUser.username
        }
        this.baseService.emitProfile(this.userService.curUser);
        this.storageService.setCurrentProfile(this.userService.curUser);

        if (this.hasPasswordChanges()) {
          this.updatePassword();
        } else {
          this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateSuccess')}`, this.translate.instant('profile.editPersonal.close'), {
            duration: 4000,
            panelClass: ['success-snack']
          });
          this.navigateBack();
        }
      }, error => {
        this.baseService.stopLoading();
        this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateError')}`, this.translate.instant('profile.editPersonal.close'), {
          duration: 4000,
          panelClass: ['error-snack']
        });
      });
    } else {
      if (this.hasPasswordChanges()) {
        this.updatePassword();
      } else {
        this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateSuccess')}`, this.translate.instant('profile.editPersonal.close'), {
          duration: 4000,
          panelClass: ['success-snack']
        });
        this.navigateBack();
      }*/
    // }
  }

  loadCities(value) {
    console.log(this.editFormGeralGroup.value.city);
    this.editFormGeralGroup.value.city = null;
    console.log(this.editFormGeralGroup.value.city);
    const found = _.find(this.countries, country => country.country === value);
    this.cities = found.cities;
  }

  navigateBack() {
    this.router.navigate(['profile']);
  }

  checkUsername() {
    const username = this.startedUserInfo.username;

    if (this.curUser.username == username) {
      this.usernameValid = true;
      return;
    }

    this.userApiService.checkUsername(this.curUser.username).subscribe(resp => {
      const result: any = resp;
      if (result.data) {
        this.snackBar.open(`${this.translate.instant('profile.editPersonal.usernameAlreadyTook')}`, this.translate.instant('profile.editPersonal.close'), {
          duration: 4000,
          panelClass: ['error-snack']
        });
        this.usernameValid = false;
      } else {
        this.usernameValid = true;
      }
    }, error => {
      this.snackBar.open(`${this.translate.instant('profile.editPersonal.usernameCheckError')}`, this.translate.instant('profile.editPersonal.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      });
      this.usernameValid = false;
    });
  }

  deactivate() {
    const currenUser = JSON.parse(localStorage.getItem('current_user'));
    const data = {
      email: currenUser.email,
      activated: false
    };

    this.userApiService.changeActivation(data).subscribe(res => {
          currenUser.activated = false;
          this.activated = false;
          this.storageService.setCurrentProfile(currenUser);

          this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateSuccess')}`, this.translate.instant('profile.editPersonal.close'), {
            duration: 4000,
            panelClass: ['success-snack']
          });

    },
    err => {
      this.snackBar.open(`${this.translate.instant('profile.editPersonal.usernameCheckError')}`, this.translate.instant('profile.editPersonal.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      });
    }    );
  }
  activate() {
    const currenUser = JSON.parse(localStorage.getItem('current_user'));
    const data = {
      email: currenUser.email,
      activated: true
    };

    this.userApiService.changeActivation(data).subscribe(res => {
          currenUser.activated = true;
          this.activated = true;
          this.storageService.setCurrentProfile(currenUser);

          this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateSuccess')}`, this.translate.instant('profile.editPersonal.close'), {
            duration: 4000,
            panelClass: ['success-snack']
          });

        },
        err => {
          this.snackBar.open(`${this.translate.instant('profile.editPersonal.usernameCheckError')}`, this.translate.instant('profile.editPersonal.close'), {
            duration: 4000,
            panelClass: ['error-snack']
          });
        }    );
  }
  editSecurityClicked() {
    this.router.navigate(['profile/security'], );
  }

  public imageChanged =false;
  public  uploadPourcentage = 0;
  public photoUrl=null;
  uploadFile(event) {
    console.log((event.target as HTMLInputElement).files[0]);
    console.log(event);
    console.log(event.total);
    /*console.log((event.loaded / event.total) * 100);*/

    this.userApiService.uploadImage((event.target as HTMLInputElement).files[0]).subscribe((res: any) => {
          if (res.type === HttpEventType.UploadProgress) {
            this.uploadPourcentage = Math.round(res.loaded / res.total * 100);
          } else { res.body != undefined && (this.curUser.avatarLink = res.body.profileImageUrl);
          this.imageChanged=true}
        },
        error => {
          this.snackBar.open(`${this.translate.instant('signup.upload_error')}`, this.translate.instant('signup.close'), {
            duration: 4000,
            panelClass: ['error-snack']
          });
          this.uploadPourcentage=0;
        }     );                                                                                                                                                 ``;
  }
  slideChange(event) {

    if (event.checked == true) {
      this.activate();
    } else {
      this.deactivate();
    }
  }
}
