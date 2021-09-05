import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from '../services/base.service';
import { StorageService } from '../services/storage.service';
import { partners } from '../../constants/partners';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(translate: TranslateService, private baseService: BaseService,
              public translateService:TranslateService,
              public storageService:StorageService,
              private router: Router,
              private snackBar: MatSnackBar, private userApiService: UserApiService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const url = val.url;
        if (url.match(/\/#\/join\/validate\?token=(.*?)/g)) {
          const token = url.replace('/#/join/validate?token=', '');
          baseService.startLoading();
          userApiService.validateToken(token).subscribe(resp => {
            this.baseService.stopLoading();
            this.snackBar.open(translate.instant('home.successValidate'), translate.instant('home.close'), {
              duration: 4000,
              panelClass: ['success-snack']
            });
            this.router.navigate(['/']);
          }, error => {
            this.baseService.stopLoading();

            const builtError = [];

            this.snackBar.open(`${translate.instant('home.errorValidate')}`, translate.instant('home.close'), {
              duration: 4000,
              panelClass: ['error-snack']
            });
            this.router.navigate(['/']);
          });
        }
      }
    });
  }
  partnersList = partners;
  innerWidth: any = window.innerWidth;

  toSearch() {
    this.router.navigate(['profiles']);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }


  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
  toSignup() {
    this.router.navigate(['signup']);
  }
}
