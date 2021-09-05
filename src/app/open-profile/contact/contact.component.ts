import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { UserApiService } from 'src/app/services/user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/services/interfaces/User';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public userProfile: any;
  public contactFormGroup: FormGroup;
  isSending: boolean =false;
    public userId;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public baseService: BaseService,
    private userApiService: UserApiService,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,

    public storageService: StorageService,
    private activatedRoute: ActivatedRoute
  ) {

      this.activatedRoute.queryParams.pipe(
          filter(params => params.id)

      ).subscribe(params => {
              this.userId=params.id;
              this.userApiService.getProfileById(params.id).subscribe(res => this.userProfile = res);
          }
      );

      this.contactFormGroup = this.formBuilder.group({
        email: new FormControl(null, [Validators.required, Validators.email]),
        message: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required])
      });


/*
    this.userProfile = this.storageService.getCurrentOpenUser();
*/
   }

  ngOnInit() {
  }

  navigateBack() {
      this.router.navigate([`profiles/open`], { queryParams: { id: this.userId } });
  }

  send() {
    const data = this.contactFormGroup.value;

    this.isSending = true;
    this.userApiService.sendContactEmail(
      {
        email: data.email,
        message: data.message,
        cofounderName: data.name,
        technicalEmail: this.userProfile.email,
        technicalName: `${this.userProfile.firstName} ${this.userProfile.lastName}`
      })
      .subscribe(resp => {
      this.isSending = false;
      this._snackBar.open(`${this.translate.instant('search.profile.successEmail')}`, this.translate.instant('search.profile.close'), {
        panelClass: ['success-snack'],
        duration: 2000,
      });
      this.router.navigate(['profiles']);
    }, error => {
          this.isSending = false;
          this._snackBar.open(`${this.translate.instant('search.profile.errorEmail')}`, this.translate.instant('search.profile.close'), {
        panelClass: ['error-snack'],
        duration: 2000,
      });
    });
  }

}
