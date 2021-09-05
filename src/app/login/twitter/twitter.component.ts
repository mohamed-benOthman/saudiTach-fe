import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { BaseService } from 'src/app/services/base.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';
import {DataServiceService} from '../../services/data-service.service';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userApiService: UserApiService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private dataService: DataServiceService,
    private baseService: BaseService,
    private translate: TranslateService,

    private storageService: StorageService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = Object.keys(params).map((key) => key + '=' + params[key]).join('&');
      console.log(queryParams);

      this.userApiService.twitterValidate(queryParams).subscribe((resp: any) => {

        if (resp.inscription === true) {
          const string = encodeURIComponent(JSON.stringify(resp));
          this.router.navigateByUrl(`signup/?user=${string}`);

        } else {
          this.dataService.changeUserLogged(resp);
          this.router.navigateByUrl('profiles');
        }

      },
          error => {
        this.router.navigateByUrl('login');
          });
      console.log(params);
    });
    const path = window.location.pathname;


  }

  ngOnInit() {
  }

}
