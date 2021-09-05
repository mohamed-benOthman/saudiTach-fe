import {Component, OnInit, Inject, HostListener, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from '../services/base.service';
import { UserApiService } from '../services/user-api.service';
import { StorageService } from '../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Md5} from 'ts-md5/dist/md5';
import { countries } from '../../constants/countries';

import * as _ from 'lodash';

import {error} from 'util';
import {PageEvent} from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import {DataServiceService} from '../services/data-service.service';
import {Subscription} from 'rxjs';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css', '../login/login.component.css' ]
})
export class ProfilesComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private baseService: BaseService,
    private userService: UserApiService,
    private userService2 : UserService,
    public storageDataService: StorageService,
    private router: Router,
    private userApiService: UserApiService,
    private dataService: DataServiceService,
    private route:ActivatedRoute,

    public dialog: MatDialog,

  ) {
    this.subscription = this.dataService.currentListOfCities.subscribe(listOfCities => {if (listOfCities.length > 0) {this.cities = listOfCities; }});

    this.subscription = this.dataService.defaultCurrent.subscribe(listOfCities => {

      if (listOfCities===true)

      {this.populateTable();
      this.dataService.changeDefault();}


    });


  }
  @ViewChild(MatPaginator, {static: false}) paginatorRef: MatPaginator;
  loading = false;
  public countries = countries;
  public filteredData: any = {
    yearsExperience: undefined,
    workedStartup: undefined,
    commitFulltime: undefined,
    willingRelocate: undefined,
    equity: undefined,
    whenStart: undefined,
    location: undefined,
    city: undefined,
    remote: undefined,
    bestAt: undefined
  };
  public space :String =" ";
  public start = 0;
  public limit = 30;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 4;

  length: number;
  public usersCount = 0;
  public usersList = [];
  public pageSlice = [];
  public totalLoaded: number;
  public cities = [];
  innerWidth = window.innerWidth;

  public location: string;
  public yearsExperience: string;
  public workedStartup: string;
  public commitFulltime: string;
  public willingRelocate: string;
  public equity: string;
  public whenStart: string;
  public name: string;
  public accordianVisible=false;
  public searching: boolean;
  pageOfItems: Array<any>;
  myCitySelect: any;
  subscription: Subscription;
  loadCities(value) {
    const found = _.find(this.countries, country => country.country === value);

    this.cities = found.cities;


  }
  changeAccordion(){
    this.accordianVisible=!this.accordianVisible
  }
  onPageChange(event: PageEvent) {

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.usersList.length) {
      endIndex = this.usersList.length;
    }
    this.pageSlice = this.usersList.slice(startIndex, endIndex);
    this.dataService.changePageIndex(this.paginatorRef.pageIndex);
    this.dataService.changePageSize(event.pageSize);
  }
  clear2() {
    this.loading = true;

    this.cities = [];
    this.userService.getUsers().subscribe((resp => {
          this.loading = false;

          const result: any = resp;
          result.users.filter(item =>
              item.activated == true && item.confirmed == true
          );
          this.usersList = result.users;
          this.pageSlice = this.usersList.slice(0, this.pageSize);

          this.loading = false;

        }),
        ((error) => {

        }));
  }
  clear3() {

    this.loading = true;
    this.cities = [];
    this.userService.getUsers().subscribe((resp => {
          this.loading = false;

          const result: any = resp;
          result.users.filter(item =>
              item.activated == true && item.confirmed == true
          );
          this.usersList = result.users;
       /*   this.pageSlice = this.usersList.slice(0, this.pageSize);*/

          this.loading = false;

        }),
        ((error) => {

        }));
  }

  clear() {
    this.loading = true;
    this.filteredData = {
      yearsExperience: undefined,
      workedStartup: undefined,
      commitFulltime: undefined,
      willingRelocate: undefined,
      equity: undefined,
      whenStart: undefined,
      location: undefined,
      city: undefined

    };
    this.cities = [];
    this.userService.getUsers().subscribe((resp => {
          this.loading = false;

          const result: any = resp;
          result.users.filter(item =>
            item.activated == true && item.confirmed == true
          );
          this.usersList = result.users;
          this.pageSlice = this.usersList.slice(0, this.pageSize);

          this.loading = false;

        }),
        ((error) => {

        }));
  }

  ngAfterViewInit() {

    this.subscription = this.dataService.currentUsers.subscribe(filteredData => {
      if (filteredData.length>0) {
        this.usersList = filteredData;
        this.subscription = this.dataService.currentPageIndex.subscribe(filteredData =>{
          if (filteredData!=0){
            this.paginatorRef.pageIndex = filteredData;
            this.pageIndex=filteredData;
          }

        } );
        this.subscription = this.dataService.currentPageSize.subscribe(filteredData =>{
          if (filteredData!=0)
          {
            this.pageSize=filteredData;
          this.paginatorRef.pageSize = filteredData;

          }
        });

        if (this.pageIndex===undefined||this.pageIndex==0)
          this.pageSlice = this.usersList.slice(0, this.paginatorRef.pageSize);
        else
        this.pageSlice = this.usersList.slice(this.pageIndex*this.pageSize, this.pageSize*(this.pageIndex+1));

      }
    /*  else {
        this.usersList=[];
      }*/
    });
  }
  ngOnInit() {
    this.subscription = this.dataService.currentUserLogged.subscribe( result => {
       this.userApiService.loginGoogle(result.email).subscribe((result:any)=>{

         this.storageDataService.setAccessToken(result.token);
         this.storageDataService.setCurrentProfile(result);
         this.baseService.emitLoggedIn(true);
         this.userService.changeAuthenticated(true);
         this.userService2.curUser = result;
         this.baseService.emitProfile(result);
       })


    })
   /* this.route.queryParams
        .subscribe(params => {
              if (params.user){
                const result = JSON.parse(params.user);
                console.log(result);
                this.storageDataService.setAccessToken(result.token);
                this.storageDataService.setCurrentProfile(result);
                this.baseService.emitLoggedIn(true);
                this.userService.changeAuthenticated(true);
                this.userService2.curUser = result;
                this.baseService.emitProfile(result);

              }




            }
        );*/
    this.subscription = this.dataService.currentFilteredData.subscribe(filteredData => this.filteredData = filteredData);
    this.subscription = this.dataService.currentUsers.subscribe(filteredData => {
      this.usersList = filteredData;
      this.pageSlice = this.usersList.slice(0, this.pageSize);
    });

    this.subscription = this.dataService.nameSearchedCurrent.subscribe(name => this.name = name);
/*    this.subscription = this.dataService.currentListOfCities.subscribe(listOfCities => {if (listOfCities.length > 0) {this.cities = listOfCities; }});
    console.log(this.filteredData.firstName);*/
  }

  loadMore() {
    this.start = this.start + this.limit;
    this.populateTable();
  }

  populateTable() {
    this.loading = true;

    this.baseService.startLoading();

    const data = {
      start: this.start,
      limit: this.limit,
      location: this.location,
      yearsExperience: this.yearsExperience,
      workedStartup: this.workedStartup,
      commitFulltime: this.commitFulltime,
      willingRelocate: this.willingRelocate,
      equity: this.equity,
      whenStart: this.whenStart
    };

    this.searching = true;

    this.userService.getUsers().subscribe(((resp:any) => {


          const result: any = resp.users;
          const result2 = result.filter(user => (user.activated===true) && (user.confirmed===true));
          this.usersList = result2;
          this.pageSlice = this.usersList.slice(0, this.pageSize);
          this.loading = false;
    }),
        ((error) => {
          this.loading = false;

    }));
  }

  getEmailHash(email) {
    return Md5.hashStr(email);
  }

  goToProfile(user) {
    this.userService.addNbVisited({email:user.email}).subscribe((res)=>{
      this.dataService.changePageSize(this.paginatorRef.pageSize);
      this.dataService.changePageIndex(this.paginatorRef.pageIndex);
      this.dataService.changeUsers(this.usersList);
      this.storageDataService.setCurrentOpenUser(user);
      this.router.navigate([`profiles/open`], { queryParams: { id: user._id } });
    })

  }

  getUserPicture(user) {
    return user.avatarLink ?
    user.avatarLink :
  /*  `https://www.gravatar.com/avatar/${this.getEmailHash(user._id)}?d=wavatar`;*/
  'https://avatars.dicebear.com/api/avataaars/'+this.getEmailHash(user.email)+'.svg?b=%23ddffd1&top[]=shortHair&top[]=hat&top[]=eyepatch&topChance=55&accessories[]=sunglasses&accessoriesColor[]=black&accessoriesColor[]=blue&accessoriesColor[]=blue01&facialHair[]=moustacheMagnum&facialHair[]=beardMajestic&facialHair[]=beardMedium&facialHair[]=medium&facialHairChance=52';}
  @HostListener('window:resize', ['$event'])
  onResize(event) {


    this.innerWidth = window.innerWidth;

  }

  goToContactPage(user) {
    /*this.storageDataService.setCurrentProfile(user);*/
    this.userService.addNbVisited({email:user.email}).subscribe((res)=>{
      this.dataService.changePageSize(this.paginatorRef.pageSize);
      this.dataService.changePageIndex(this.paginatorRef.pageIndex);
      this.dataService.changeUsers(this.usersList);
      this.storageDataService.setCurrentOpenUser(user);
      this.router.navigate([`profiles/open/contact`], { queryParams: { id: user._id } });
    })
  }
  filterUsername() {
    this.pageOfItems.filter(user => {
      user.firstName.includes(this.name) ||  user.lastName.includes(this.name);
    });
  }

  filter() {
 /*   if (this.filteredData.length==0){
    this.userService.getUsers().subscribe((resp => {


          const result: any = resp;
          this.usersList = result.users;
          this.loading = false;
        }),
        ((error) => {
          this.loading = false;

        }));
    }*/
    const oldUserListLength = this.usersList.length;
    this.dataService.resetPageSize();
    this.dataService.resetPageIndex();
    if (this.paginatorRef!=undefined)
    this.paginatorRef.pageIndex=0;
    if (this.paginatorRef !=undefined)
     this.paginatorRef.pageSize=4;


    /*this.start = 0;
    this.limit = 30;*/
    const data = {
    /*  start: this.start,
      limit: this.limit,*/
      country:  this.filteredData.location,
      yearsExperience: this.filteredData.yearsExperience,
      startupExperience: this.filteredData.workedStartup,
      commitFulltime: this.filteredData.commitFulltime,
      relocate: this.filteredData.willingRelocate,
      equity: this.filteredData.equity,
      whenStart: this.filteredData.whenStart,
      firstName: undefined,
      bestAt: this.filteredData.bestAt,
      remote: this.filteredData.remote,
      city: this.filteredData.city === '---' ? '' : this.filteredData.city
    };

    Object.keys(data).forEach(key => (data[key] === undefined  ||  data[key] === '')  ? delete data[key] : {});

    this.searching = true;
    this.userService.getFilteredUsers(data).subscribe((resp: any) => {
      this.usersList = [];
      this.pageSlice = [];
      if (this.name != undefined) {
      for (const user of resp.usersFound) {
        /*if ((user.firstName.includes(this.name)==true) || (user.lastName.includes(this.name)==true)){
          this.usersList = this.usersList.concat(user);
        }*/
        const firstNameLowerCase = user.firstName.toLowerCase();
        const lastNameLowerCase = user.lastName.toLowerCase();
        if ((firstNameLowerCase.includes(this.name) == true) || (lastNameLowerCase.includes(this.name) == true)) {
          this.usersList = this.usersList.concat(user);
        }
        this.usersList.filter(item =>
            item.activated == true && item.confirmed == true
        );
        if (this.paginatorRef!=undefined){
        this.paginatorRef.pageSize=4;
        this.paginatorRef.pageIndex=0}
        this.pageSlice = this.usersList.slice(0, 4);
      }
      } else {
        this.paginatorRef.pageSize=4;
        this.paginatorRef.pageIndex=0
      this.usersList = this.usersList.concat(resp.usersFound);
      this.usersList.filter(item =>
            item.activated == true && item.confirmed == true
        );
      if (oldUserListLength > 1) {
      this.pageSize=4;
      this.paginatorRef.pageSize=4
      this.paginatorRef.pageIndex=0;
        this.pageSlice = this.usersList.slice(0, 4);

      } else {
        this.pageSize=4;
        this.paginatorRef.pageSize=4
        this.paginatorRef.pageIndex=0;
        this.pageSlice = this.usersList.slice(0, 4);
      }

      }
      this.dataService.changeNameSearched(this.name);
      this.dataService.changeUsers(this.usersList);

/*      this.dataService.changePageSize(this.paginatorRef.pageSize);
      this.dataService.changePageIndex(this.paginatorRef.pageIndex);*/

      // localStorage.setItem('filteredUser',JSON.stringify(this.usersList));
      this.dataService.changeFilteredData(this.filteredData);
      this.dataService.changeCities(this.cities);


      this.totalLoaded = this.usersList.length;
      this.dataService.resetPageIndex();
      this.dataService.resetPageSize();
      this.paginatorRef.pageSize=4;
      this.paginatorRef.pageIndex=0
      this.pageSlice = this.usersList.slice(0, 4);
      /*this.userService.countUsers(data).subscribe(resp => {
        const result: any = resp;
        this.usersCount = result.data;
        this.searching = false;
        this.baseService.stopLoading();
      });*/
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  compareFn(c1: any, c2:any): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }
  compareFn2(c1: any, c2:any): boolean {

    return c1 && c2 ? c1.country === c2.country : c1 === c2;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogProfilesFilter, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      data: {
        location: this.location,
        yearsExperience: this.yearsExperience,
        workedStartup: this.workedStartup,
        commitFulltime: this.commitFulltime,
        willingRelocate: this.willingRelocate,
        equity: this.equity,
        whenStart: this.whenStart
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.location = result.location;
        this.yearsExperience = result.yearsExperience;
        this.workedStartup = result.workedStartup;
        this.commitFulltime = result.commitFulltime;
        this.willingRelocate = result.willingRelocate;
        this.equity = result.equity;
        this.whenStart = result.whenStart;

        this.start = 0;
        this.limit = 30;

        const data = {
          start: this.start,
          limit: this.limit,
          location: this.location,
          yearsExperience: this.yearsExperience,
          workedStartup: this.workedStartup,
          commitFulltime: this.commitFulltime,
          willingRelocate: this.willingRelocate,
          equity: this.equity,
          whenStart: this.whenStart
        };

        this.searching = true;
        this.userService.listUsers(data).subscribe(resp => {
          const result: any = resp;
          this.usersList = result.data;
          this.totalLoaded = this.usersList.length;
          this.userService.countUsers(data).subscribe(resp => {
            const result: any = resp;
            this.usersCount = result.data;
            this.searching = false;
            this.baseService.stopLoading();
          });
        });
      }
    });
  }
}

export interface FilterData {
  yearsExperience: string;
  workedStartup: string;
  commitFulltime: string;
  willingRelocate: string;
  equity: string;
  whenStart: string;
  location: string;
  city: string;
}

@Component({
  selector: 'dialog-profiles-filter',
  templateUrl: './dialog-profiles-filter.html',
  styleUrls: ['./dialog-profiles-filter.css']
})
export class DialogProfilesFilter {

  constructor(
    public dialogRef: MatDialogRef<DialogProfilesFilter>,
    @Inject(MAT_DIALOG_DATA) public data: FilterData,
    private dataService: DataServiceService) {}

  public countries = countries;

  close(): void {
    this.dialogRef.close();
  }

  clear() {
    this.dataService.resetCities();
    this.dataService.resetFilteredData();
    this.dataService.resetNameSearched();
    this.dataService.resetPageIndex();
    this.dataService.resetPageSize();
    this.dataService.resetNameSearched();
    this.data = {
      yearsExperience: '',
      workedStartup: '',
      commitFulltime: '',
      willingRelocate: '',
      equity: '',
      whenStart: '',
      location: '',
      city: ''
    };
  }

  remove(field) {
    this.data[field] = '';
  }
}
