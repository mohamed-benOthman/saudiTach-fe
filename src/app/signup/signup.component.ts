import {Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl,  Validators } from '@angular/forms';
import { UserApiService } from 'src/app/services/user-api.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { StorageService } from 'src/app/services/storage.service';
import { BaseService } from 'src/app/services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { PasswordValidation } from './password.validation';
import { countries } from '../../constants/countries';
import {DevDialogueComponent} from './dev-dialogue/dev-dialogue.component';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {AuthService} from 'angularx-social-login';
import {SocialUser, GoogleLoginProvider} from 'angularx-social-login';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';
import {technologies} from '../../constants/technologies';
import {UserService} from '../services/user.service';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userApiService: UserApiService,
    public storageService: StorageService,
    private baseService: BaseService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.filteredDevops = this.devopsCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filterDevops(fruit) : this.allDevops.slice()));
    this.filteredDesign = this.designCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filterDesign(fruit) : this.allDesign.slice()));
    this.filteredDatabase = this.databaseCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filterDatabase(fruit) : this.allDatabase.slice()));
    this.filteredFrontend = this.frontendCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filterFrontend(fruit) : this.allFrontend.slice()));
    this.filteredBackend = this.backendCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filterBackend(fruit) : this.allBackend.slice()));

    this.signupFormEmailGroup = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),

      iUnderstand: new FormControl(null)

    });
    this.signupFormExperienceGroup = this.formBuilder.group({
      yearsExperience: new FormControl(null, [Validators.required]),
      startupExperience: new FormControl(null, [Validators.required]),
      relocate: new FormControl(null, [Validators.required]),
      remote: new FormControl(null, [Validators.required]),
      equity: new FormControl(null, [Validators.required]),
      commitFulltime: new FormControl(null, [Validators.required]),
      tellMore: new FormControl(null, [Validators.required]),
      whenStart: new FormControl(null, [Validators.required]),
      bestAt: new FormControl(null, [Validators.required]),
    });

    this.signupFormGeralGroup = this.formBuilder.group({
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      linkedInProfile: new FormControl(null, [Validators.required]),
      twitter: new FormControl(null, [Validators.required]),
    }, );
  }

  public countries = countries;
  public cities = [];
 public signupEmail=false;
  public signupFormEmailGroup: FormGroup;
  public signupFormGeralGroup: FormGroup;
  public signupFormExperienceGroup: FormGroup;
  public isFirstStep = true;
  public isSecondStep = false;
  public isFourthStep = false;
  public isThirdStep = false;
  public allOk = false;
  public iUnderstand = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  databaseCtrl = new FormControl();
  filteredDatabase: Observable<string[]>;
  Database: any[] = [];
  allDatabase: any[] = technologies.database;
  designCtrl = new FormControl();
  filteredDesign: Observable<string[]>;
  Design: any[] = [];
  allDesign: any[] = technologies.design;
  frontendCtrl = new FormControl();
  filteredFrontend: Observable<any[]>;
  frontend: any[] = [];
  allFrontend: any[] = technologies.frontend;
  backendCtrl = new FormControl();
  filteredBackend: Observable<string[]>;
  backend: any[] = [];
  about = '';
  avatarLink = '';
  allBackend: any[] = technologies.backend;
  devopsCtrl = new FormControl();
  filteredDevops: Observable<string[]>;
  Devops: any[] = [];
  allDevops: any[] = technologies.devops;
  oathSignup = false;
  photoUrl = null;
  innerWidth = window.innerWidth;
  linkedin = 'sdads';
  twitter = '';
    twitterLog=false;

  // @ts-ignore
  @ViewChild('devopsInput') devopsInput: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('devopsAuto') matAutocomplete: MatAutocomplete;
  // @ts-ignore
  @ViewChild('designInput') designInput: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('designAuto') matAutocomplete: MatAutocomplete;
  // @ts-ignore
  @ViewChild('frontendInput') frontendInput: ElementRef<HTMLInputElement>;
  // @ts-ignore

  @ViewChild('frontendAuto', { static: false }) matAutocomplete: MatAutocomplete;

  // @ts-ignore
  @ViewChild('backendInput') backendInput: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('backendAuto') matAutocomplete: MatAutocomplete;

  // @ts-ignore
  @ViewChild('databaseInput') databaseInput: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('databaseAuto') matAutocomplete: MatAutocomplete;
  isShow: boolean;
  topPosToStartShowing = 100;
 public  uploadPourcentage = 0;
linkedin1:boolean=false;


  ngOnInit() {
      this.route.queryParams
          .subscribe(params => {
              if (params.user) {
                  const user = JSON.parse(params.user);
                  this.oathSignup = true;
                  this.signupFormEmailGroup.value.email = user.email;
                  this.signupFormEmailGroup.value.firstName = user.firstName;
                  this.signupFormEmailGroup.value.lastName = user.lastName;
                  this.signupFormGeralGroup.value.twitter = user.twitterUsername;
                  this.photoUrl = user.avatarLink;
                  if (user.twitterUsername!=undefined)
                  {this.twitter = user.twitterUsername;
                  this.twitterLog=true;
                  }
                  if (user.linkedin===true)
                  {this.linkedin1=true;
                  }


                  this.next();

                  console.log(this.signupFormEmailGroup.value);
              } else {
                  this.openDialog();
              }



              }
          );


  }
  ngAfterViewInit() {
      this.route.queryParams
          .subscribe(params => {
                  if (params.user) {
                      const user = JSON.parse(params.user);
                      this.oathSignup = true;
                      this.signupFormEmailGroup.value.email = user.email;
                      this.signupFormEmailGroup.value.firstName = user.firstName;
                      this.signupFormEmailGroup.value.lastName = user.lastName;
                      if (user.twitterUsername!=undefined)
                      {this.twitter = user.twitterUsername;
                          this.twitterLog=true;
                      }
                      this.photoUrl = user.avatarLink;
                      this.next();

                      console.log(this.signupFormEmailGroup.value);
                  }




              }
          );
  }

    navigate() {
    this.router.navigate(['login']);
  }

    socialLoginLinkedin() {
        if (!this.iUnderstand) {
            this.snackBar.open(`${this.translate.instant('signup.user_agreement')}`, this.translate.instant('signup.close'), {
                duration: 4000,
                panelClass: ['error-snack']
            }); } else {
            window.location.href = this.userApiService.linkedinLogin();
        }
    }
  signup() {
    const signupDate = new Date();
    console.log(signupDate);
    let confirmed = false;
    if (this.oathSignup == true) {
      confirmed = true;
    }
    const data = {
      country: this.signupFormGeralGroup.value.country,
      city: this.signupFormGeralGroup.value.city,
      firstName: this.signupFormEmailGroup.value.firstName,

      lastName: this.signupFormEmailGroup.value.lastName,
      password: this.signupFormGeralGroup.value.password,
      email: this.signupFormEmailGroup.value.email,
      startupExperience: this.signupFormExperienceGroup.value.startupExperience,
      yearsExperience: this.signupFormExperienceGroup.value.yearsExperience,
      linkedInProfile: this.signupFormGeralGroup.value.linkedInProfile,
      twitter: this.signupFormGeralGroup.value.twitter,
      commitFulltime: this.signupFormExperienceGroup.value.commitFulltime,
      tellMore: this.signupFormExperienceGroup.value.tellMore,
      relocate: this.signupFormExperienceGroup.value.relocate,
      equity: this.signupFormExperienceGroup.value.equity,
      whenStart: this.signupFormExperienceGroup.value.whenStart,
      bestAt: this.signupFormExperienceGroup.value.bestAt,
      remote: this.signupFormExperienceGroup.value.remote,
      devops: this.Devops,
      frontend: this.frontend,
      backend: this.backend,
      database: this.Database,
      design: this.Design,

      signupDate,
      lastLoginDate: signupDate,
      socialLogin: false,
      avatarLink: this.photoUrl != null ? this.photoUrl : null,
      activated: true,
      confirmed


    };

    console.log(this.oathSignup);
    console.log(data);

    this.baseService.startLoading();
    if (this.oathSignup == false) {
    this.userApiService.register(data).subscribe(resp => {
      const result: any = resp;

      this.baseService.stopLoading();
      this.isFirstStep = false;
      this.isSecondStep = false;
      this.isThirdStep = false;
      this.isFourthStep = false;
      this.allOk = true;


    }, error => {
      this.baseService.stopLoading();

      this.snackBar.open(`${this.translate.instant('signup.error')}`, this.translate.instant('signup.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      });
    }); } else {
      data.socialLogin = true;
      this.userApiService.registerOath(data).subscribe(resp => {
        const result: any = resp;
        this.userApiService.loginGoogle(data.email).subscribe((resp: any) => {
          console.log(resp);
          const result: any = resp;
          this.storageService.setAccessToken(result.token);
          this.storageService.setCurrentProfile(resp);
          this.baseService.emitLoggedIn(true);
          this.userApiService.changeAuthenticated(true);
          this.userService.curUser = resp;
          this.baseService.emitProfile(resp);
          this.router.navigate(['profiles']);

        });



      }, error => {
        this.baseService.stopLoading();

        this.snackBar.open(`${this.translate.instant('signup.error')}`, this.translate.instant('signup.close'), {
          duration: 4000,
          panelClass: ['error-snack']
        });
      });
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.Devops.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.devopsCtrl.setValue(null);
  }

  removeDevops(fruit: string): void {
    const index = this.Devops.indexOf(fruit);

    if (index >= 0) {
      this.Devops.splice(index, 1);
    }
  }
  removeDesign(fruit: string): void {
    const index = this.Design.indexOf(fruit);

    if (index >= 0) {
      this.Design.splice(index, 1);
    }
  }
  removeFrontend(fruit: string): void {
    const index = this.frontend.indexOf(fruit);

    if (index >= 0) {
      this.frontend.splice(index, 1);
    }
  }
  removeBackend(fruit: string): void {
    const index = this.backend.indexOf(fruit);

    if (index >= 0) {
      this.backend.splice(index, 1);
    }
  }
  uploadFile(event) {
          console.log((event.target as HTMLInputElement).files[0]);
          console.log(event);
          console.log(event.total);
     /*console.log((event.loaded / event.total) * 100);*/

          this.userApiService.uploadImage((event.target as HTMLInputElement).files[0]).subscribe((res: any) => {
               if (res.type === HttpEventType.UploadProgress) {
                 this.uploadPourcentage = Math.round(res.loaded / res.total * 100);
               } else { res.body != undefined && (this.photoUrl = res.body.profileImageUrl); }
             },
                     error => {
                   this.snackBar.open(`${this.translate.instant('signup.upload_error')}`, this.translate.instant('signup.close'), {
                     duration: 4000,
                     panelClass: ['error-snack']
                   });
                   this.uploadPourcentage = 0;
                 }     );                                                                                                                                                 ``;
  }
  removeDatabase(fruit: string): void {
    const index = this.Database.indexOf(fruit);

    if (index >= 0) {
      this.Database.splice(index, 1);
    }
  }





  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allDevops.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  loadCities(value) {

    const found = _.find(this.countries, country => country.country === value);
    console.log(found);
    console.log(found.cities[0]);

    found.cities.unshift( { name : '---' });

    this.cities = found.cities;
    if (this.cities[0].name === this.cities[1].name) {
      this.cities.shift();
    }
    console.log(this.cities);

  }
   topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  next() {
    this.userApiService.checkUser(this.signupFormEmailGroup.value.email).subscribe((res) => {
          this.isFirstStep = false;
          this.isThirdStep = false;
          this.isSecondStep = true;
          this.gotoTop();
          this.topFunction();

    },
    error => {
      this.snackBar.open(`${this.translate.instant('signup.user_exist')}`, this.translate.instant('signup.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      });
    }    );

  }
  next2() {

      if (this.twitter.length > 0) {
          this.signupFormGeralGroup.value.twitter = this.twitter;
      }
      this.isSecondStep = false;
      this.isThirdStep = true;
      this.isFirstStep = false;
      this.gotoTop();
      this.topFunction();

  }
   previous2() {
    this.isSecondStep = false;
    this.isThirdStep = false;
    this.isFirstStep = true;
    this.gotoTop();
  }

  previous4() {
    this.isThirdStep = true;
    this.isFourthStep = false;
    this.gotoTop();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {


    this.innerWidth = window.innerWidth;

  }

  numberOfLeftCharacters(data: string): Number {
    const newString = data.split(' ').join('');
    return (1000 - newString.length);

  }
  next3() {
    this.isSecondStep = false;
    this.isThirdStep = false;
    this.isFourthStep = true;
    this.isFirstStep = false;
    this.gotoTop();

  }
  previous3() {
    this.isSecondStep = true;
    this.isThirdStep = false;
    this.isFourthStep = false;
    this.isFirstStep = false;
    this.gotoTop();
  }


  previous() {
    this.isFirstStep = true;
    this.isSecondStep = false;
    this.gotoTop();
  }

  resend() {
    const email = this.signupFormEmailGroup.value.email;
    const data = {
      email
    };
    this.userApiService.resend(data).subscribe(resp => {
      const result: any = resp;

      this.baseService.stopLoading();

      this.snackBar.open(`${this.translate.instant('signup.newTokenSuccess')}`, this.translate.instant('signup.close'), {
        duration: 4000,
        panelClass: ['success-snack']
      });

    }, error => {
      this.baseService.stopLoading();

      this.snackBar.open(`${this.translate.instant('signup.newTokenError')}`, this.translate.instant('signup.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      });
    });
  }
  openDialog() {
    this.dialog.open(DevDialogueComponent, { disableClose: true,  });
  }
  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  socialLoginGoogle() {
    if (!this.iUnderstand) {
      this.snackBar.open(`${this.translate.instant('signup.user_agreement')}`, this.translate.instant('signup.close'), {
        duration: 4000,
        panelClass: ['error-snack']
      });
    } else {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.authService.authState.subscribe((user) => {
        console.log(user);
        this.userApiService.checkUser(user.email).subscribe((res) => {
          console.log(res);
          this.signupFormEmailGroup.value.firstName = user.firstName;
          this.signupFormEmailGroup.value.lastName = user.lastName;
          this.signupFormEmailGroup.value.email = user.email;
          this.signupFormGeralGroup.value.password = '000000';
          this.photoUrl = user.photoUrl;
          this.next();
          this.oathSignup = true;
            },
            (error) => {
              this.snackBar.open(`${this.translate.instant('signup.user_exist')}`, this.translate.instant('signup.close'), {
                duration: 4000,
                panelClass: ['error-snack']
              });

            });
        console.log(user);
      });
    }

  }
  private _filterFrontend(choice: any): any[] {
    console.log(choice);
    const filterValue = choice.toLowerCase();

    return this.allFrontend.filter(fe => fe.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterBackend(choice: any): any[] {
    console.log(choice);
    const filterValue = choice.toLowerCase();

    return this.allBackend.filter(fe => fe.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterDevops(choice: any): any[] {
    console.log(choice);
    const filterValue = choice.toLowerCase();

    return this.allDevops.filter(fe => fe.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterDatabase(choice: any): any[] {
    console.log(choice);
    const filterValue = choice.toLowerCase();

    return this.allDatabase.filter(fe => fe.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterDesign(choice: any): any[] {
    console.log(choice);
    const filterValue = choice.toLowerCase();

    return this.allDesign.filter(fe => fe.name.toLowerCase().indexOf(filterValue) === 0);
  }
  socialLoginTwitter() {
      if (!this.iUnderstand) {
          this.snackBar.open(`${this.translate.instant('signup.user_agreement')}`, this.translate.instant('signup.close'), {
              duration: 4000,
              panelClass: ['error-snack']
          }); } else {
    window.location.href = this.userApiService.twitterLogin();
      }
  }
  selectedDevops(event: MatAutocompleteSelectedEvent): void {
    this.Devops.push(event.option.viewValue);
    this.devopsInput.nativeElement.value = '';
    this.devopsCtrl.setValue(null);
  }
  selectedDatabase(event: MatAutocompleteSelectedEvent): void {
    this.Database.push(event.option.viewValue);
    this.databaseInput.nativeElement.value = '';
    this.databaseCtrl.setValue(null);
  }
  selectedDesign(event: MatAutocompleteSelectedEvent): void {
    this.Design.push(event.option.viewValue);
    this.designInput.nativeElement.value = '';
    this.designCtrl.setValue(null);
  }
  selectedFrontend(event: MatAutocompleteSelectedEvent): void {
    this.frontend.push(event.option.viewValue);
    this.frontendInput.nativeElement.value = '';
    this.frontendCtrl.setValue(null);
  }
  selectedBackend(event: MatAutocompleteSelectedEvent): void {
    this.backend.push(event.option.viewValue);
    this.backendInput.nativeElement.value = '';
    this.backendCtrl.setValue(null);
  }
}
