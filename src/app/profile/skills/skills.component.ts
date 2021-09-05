import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { technologies } from '../../../constants/technologies';
import { UserService } from 'src/app/services/user.service';

import * as _ from 'lodash';
import { BaseService } from 'src/app/services/base.service';
import { UserApiService } from 'src/app/services/user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private baseService: BaseService,
    private userApiService: UserApiService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private storageService: StorageService
  ) {
    const profile = this.storageService.getCurrentProfile();
    if (profile) {
      if (profile.profile && (!profile.profile.country || !profile.profile.city)) {
        this.router.navigate(['profile/edit-personal']);
      }
    }

    this.curUser = _.clone(this.userService.curUser);

    this.filteredFrontend = this.frontendCtrl.valueChanges.pipe(
      startWith(null),
      map((fe: string | null) => fe ? this._filterFrontend(fe) : this.frontend.slice())
    );

    this.filteredBackend = this.backendCtrl.valueChanges.pipe(
      startWith(null),
      map((be: string | null) => be ? this._filterBackend(be) : this.backend.slice())
    );

    this.filteredDatabase = this.databaseCtrl.valueChanges.pipe(
      startWith(null),
      map((db: string | null) => db ? this._filterDatabase(db) : this.database.slice())
    );

    this.filteredDesign = this.designCtrl.valueChanges.pipe(
      startWith(null),
      map((de: string | null) => de ? this._filterDesign(de) : this.design.slice())
    );

    this.filteredDevops = this.devopsCtrl.valueChanges.pipe(
      startWith(null),
      map((dv: string | null) => dv ? this._filterDevops(dv) : this.devops.slice())
    );
  }

  public frontend = technologies.frontend;
  public backend = technologies.backend;
  public devops = technologies.devops;
  public design = technologies.design;
  public database = technologies.database;
  public curUser: any;

  visible = true;
  selectable = true;
  removable = true;

  /** frontend */
  frontendCtrl = new FormControl();
  filteredFrontend: Observable<any[]>;

  @ViewChild('frontendInput', { static: false }) frontendInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoFrontend', { static: false }) matAutocomplete: MatAutocomplete;

  /** backend */
  backendCtrl = new FormControl();
  filteredBackend: Observable<any[]>;

  @ViewChild('backendInput', { static: false }) backendInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoBackend', { static: false }) matAutocompleteBackend: MatAutocomplete;

  /** design */
  designCtrl = new FormControl();
  filteredDesign: Observable<any[]>;

  @ViewChild('designInput', { static: false }) designInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoDesign', { static: false }) matAutocompleteDesign: MatAutocomplete;

  /** database */
  databaseCtrl = new FormControl();
  filteredDatabase: Observable<any[]>;

  @ViewChild('databaseInput', { static: false }) databaseInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoDatabase', { static: false }) matAutocompleteDatabase: MatAutocomplete;

  /** devops */
  devopsCtrl = new FormControl();
  filteredDevops: Observable<any[]>;

  @ViewChild('devopsInput', { static: false }) devopsInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoDevops', { static: false }) matAutocompleteDevops: MatAutocomplete;

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigate(['profile']);
  }

  removeFrontend(frontend: any): void {
    const index = this.curUser.profile.frontend.indexOf(frontend);

    if (index >= 0) {
      this.curUser.splice(index, 1);
    }
  }

  selectedFrontend(event: MatAutocompleteSelectedEvent): void {
    this.curUser.frontend ?
      this.curUser.frontend.push(event.option.value) :
      this.curUser.frontend = [event.option.value];
    this.frontendInput.nativeElement.value = '';
    this.frontendCtrl.setValue(null);


  }

  private _filterFrontend(choice: any): any[] {
    const filterValue = choice.value ? choice.value.toLowerCase() : choice.toLowerCase();

    return this.frontend.filter(fe => fe.value.toLowerCase().indexOf(filterValue) === 0);
  }

  removeBackend(backend: any): void {
    const index = this.curUser.backend.indexOf(backend);

    if (index >= 0) {
      this.curUser.backend.splice(index, 1);
    }
  }

  selectedBackend(event: MatAutocompleteSelectedEvent): void {
    this.curUser.backend ?
      this.curUser.backend.push(event.option.value) :
      this.curUser.backend = [event.option.value];
    this.backendInput.nativeElement.value = '';
    this.backendCtrl.setValue(null);
  }

  private _filterBackend(choice: any): any[] {
    const filterValue = choice.value ? choice.value.toLowerCase() : choice.toLowerCase();

    return this.backend.filter(be => be.value.toLowerCase().indexOf(filterValue) === 0);
  }

  removeDesign(design: any): void {
    const index = this.curUser.profile.design.indexOf(design);

    if (index >= 0) {
      this.curUser.design.splice(index, 1);
    }
  }

  selectedDesign(event: MatAutocompleteSelectedEvent): void {
    this.curUser.design ?
      this.curUser.design.push(event.option.value) :
      this.curUser.design = [event.option.value];
    this.designInput.nativeElement.value = '';
    this.designCtrl.setValue(null);
  }

  private _filterDesign(choice: any): any[] {
    const filterValue = choice.value ? choice.value.toLowerCase() : choice.toLowerCase();

    return this.design.filter(de => de.value.toLowerCase().indexOf(filterValue) === 0);
  }

  removeDatabase(database: any): void {
    const index = this.curUser.database.indexOf(database);

    if (index >= 0) {
      this.curUser.database.splice(index, 1);
    }
  }

  selectedDatabase(event: MatAutocompleteSelectedEvent): void {
    this.curUser.database ?
      this.curUser.database.push(event.option.value) :
      this.curUser.database = [event.option.value];
    this.databaseInput.nativeElement.value = '';
    this.databaseCtrl.setValue(null);
  }

  private _filterDatabase(choice: any): any[] {
    const filterValue = choice.value ? choice.value.toLowerCase() : choice.toLowerCase();

    return this.database.filter(db => db.value.toLowerCase().indexOf(filterValue) === 0);
  }

  removeDevops(devops: any): void {
    const index = this.curUser.devops.indexOf(devops);

    if (index >= 0) {
      this.curUser.devops.splice(index, 1);
    }
  }

  selectedDevops(event: MatAutocompleteSelectedEvent): void {
    this.curUser.devops ?
      this.curUser.devops.push(event.option.value) :
      this.curUser.devops = [event.option.value];
    this.devopsInput.nativeElement.value = '';
    this.devopsCtrl.setValue(null);
  }

  private _filterDevops(choice: any): any[] {
    const filterValue = choice.value ? choice.value.toLowerCase() : choice.toLowerCase();

    return this.devops.filter(dv => dv.value.toLowerCase().indexOf(filterValue) === 0);
  }

  /*update() {
    const data = {
      profile: {
        city: this.userService.curUser.profile.city,
        country: this.userService.curUser.profile.country,
        linkedin: this.userService.curUser.profile.linkedin,
        twitter: this.userService.curUser.profile.twitter,
        tellMore: this.userService.curUser.profile.tellMore,
        yearsExperience: this.userService.curUser.profile.yearsExperience,
        workedStartup: this.userService.curUser.profile.workedStartup,
        commitFulltime: this.userService.curUser.profile.commitFulltime,
        willingRelocate: this.userService.curUser.profile.willingRelocate,
        equity: this.userService.curUser.profile.equity,
        whenStart: this.userService.curUser.profile.whenStart,
        frontend: this.curUser.profile.frontend,
        backend: this.curUser.profile.backend,
        design: this.curUser.profile.design,
        database: this.curUser.profile.database,
        devops: this.curUser.profile.devops,
        avatarLink: this.userService.curUser.profile.avatarLink
      },
      id: this.userService.curUser._id,
      firstName: this.userService.curUser.firstName,
      lastName: this.userService.curUser.lastName,
      username: this.userService.curUser.username,
    }

    this.baseService.startLoading();

    this.userApiService.update(data).subscribe(resp => {
        this.userService.curUser.profile.tellMore = data.profile.tellMore;

        this.baseService.emitProfile(this.userService.curUser);
        this.storageService.setCurrentProfile(this.userService.curUser);

        this.snackBar.open(`${this.translate.instant('profile.editSkills.updateSuccess')}`, this.translate.instant('profile.editSkills.close'), {
          duration: 4000,
          panelClass: ['success-snack']
        });
        this.navigateBack();
      }, error => {
        this.baseService.stopLoading();
        this.snackBar.open(`${this.translate.instant('profile.editSkills.updateError')}`, this.translate.instant('profile.editSkills.close'), {
          duration: 4000,
          panelClass: ['error-snack']
        });
      });
  }*/

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
          // tslint:disable-next-line:max-line-length
          this.snackBar.open(`${this.translate.instant('profile.editPersonal.updateError')}`, this.translate.instant('profile.editPersonal.close'), {
            duration: 4000,
            panelClass: ['error-snack']
          });
        }

    );


  }
}
