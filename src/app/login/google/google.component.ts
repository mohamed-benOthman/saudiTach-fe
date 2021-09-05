import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userApiService: UserApiService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private baseService: BaseService,
    private translate: TranslateService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = Object.keys(params).map((key) => key + '=' + params[key]).join('&');
      this.userApiService.googleValidate(queryParams).subscribe(resp => {
        const result: any = resp;
        this.storageService.setAccessToken(result.data.access.access_token);
        this.storageService.setCurrentProfile({ email: result.data.email });
        this.userApiService.isAuthenticated().subscribe(resp => {
          const res: any = resp;
          this.userService.curUser = res.data;
          this.storageService.setCurrentProfile(res.data);
          this.baseService.stopLoading();
          this.baseService.emitLoggedIn(true);
          this.baseService.emitProfile(result.data);
          this.router.navigate(['profile']);
        }, error => {
          this.snackBar.open(`${this.translate.instant('login.error')}`, this.translate.instant('login.close'), {
            duration: 4000,
            panelClass: ['error-snack']
          });
        });
      }, error => {
        this.snackBar.open(`${this.translate.instant('login.error')}`, this.translate.instant('login.close'), {
          duration: 4000,
          panelClass: ['error-snack']
        });
      });
    });
  }

  ngOnInit() {
  }

}
