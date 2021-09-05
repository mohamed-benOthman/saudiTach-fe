import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { UserApiService } from '../services/user-api.service';
import { User } from '../services/interfaces/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../services/storage.service';
import {Md5} from 'ts-md5/dist/md5';
import { countries } from '../../constants/countries';
import * as moment from 'moment';
import {filter} from 'rxjs/operators';
@Component({
  selector: 'app-open-profile',
  templateUrl: './open-profile.component.html',
  styleUrls: ['./open-profile.component.css']
})
export class OpenProfileComponent implements OnInit {
  public userProfile: any;
  public countries = countries;
  public userId ;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private userApiService: UserApiService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    public storageService: StorageService,
    private activatedRoute: ActivatedRoute,

  ) {

    this.activatedRoute.queryParams.pipe(
        filter(params => params.id)

    ).subscribe(params => {
      this.userId=params.id;
       this.userApiService.getProfileById(params.id).subscribe(res => this.userProfile = res);
        }
    );


   }

  ngOnInit() {
  }

  getEmailHash(email) {
    return Md5.hashStr(email);
  }

  getLocalTime(country) {
    const ct = this.countries.find(ct => ct.country == country);
    return moment().utcOffset(ct.tz).format('HH:mm');
  }

  goToContactPage() {
    this.router.navigate(['profiles/open/contact'], {queryParams: { id: this.userId }});
  }

  navigateBack() {
    this.router.navigate(['profiles']);
  }

  getUserPicture() {
    return this.userProfile.avatarLink ?
    this.userProfile.avatarLink :
        'https://avatars.dicebear.com/api/avataaars/' + this.getEmailHash(this.userProfile.email) + '.svg?b=%23ddffd1&top[]=shortHair&top[]=hat&top[]=eyepatch&topChance=55&accessories[]=sunglasses&accessoriesColor[]=black&accessoriesColor[]=blue&accessoriesColor[]=blue01&facialHair[]=moustacheMagnum&facialHair[]=beardMajestic&facialHair[]=beardMedium&facialHair[]=medium&facialHairChance=52';
  }
}
