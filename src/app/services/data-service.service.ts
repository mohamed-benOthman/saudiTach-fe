import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public oldFilteredData: any = {
    yearsExperience: undefined,
    workedStartup: undefined,
    commitFulltime: undefined,
    willingRelocate: undefined,
    equity: undefined,
    whenStart: undefined,
    location: undefined,
    city: undefined,
    remote:undefined,
    bestAt:undefined
  };

  piginatedFitered:boolean=false;
  oldCities:any[]=[];
  oldUsers:any=[];
  private paginatedFilteredSource = new BehaviorSubject(false);
  currentPaginatedFiltered = this.paginatedFilteredSource.asObservable();
  private filteredDataSource = new BehaviorSubject(this.oldFilteredData);
  currentFilteredData = this.filteredDataSource.asObservable();

  private userLoggedSource = new BehaviorSubject(null);
  currentUserLogged = this.userLoggedSource.asObservable();


  private listOfCitiesSource = new BehaviorSubject(this.oldCities);
  currentListOfCities = this.listOfCitiesSource.asObservable();

  private defaultSource = new BehaviorSubject(true);
  defaultCurrent = this.defaultSource.asObservable();

  private nameSearchedSource = new BehaviorSubject("");
  nameSearchedCurrent = this.nameSearchedSource.asObservable();

  private usersSource = new BehaviorSubject(this.oldUsers);
  currentUsers= this.usersSource.asObservable();

  private pageSizeSource = new BehaviorSubject(0);
  currentPageSize= this.pageSizeSource.asObservable();

  private pageIndexSource = new BehaviorSubject(0);
  currentPageIndex= this.pageIndexSource.asObservable();


  constructor() { }

  changeNameSearched(name :any) {
    this.nameSearchedSource.next(name);
  }

  changeUserLogged(user:any){
    this.userLoggedSource.next(user);}
  changePaginatedFiltered(name :boolean) {
    this.paginatedFilteredSource.next(name);
  }
  resetNameSearched(){
    this.nameSearchedSource.next('') ;
  }
  changeDefault() {
    this.defaultSource.next(false);
  }
  resetDefault(){
    this.defaultSource.next(true) ;
  }
  changeCities(cities:any[]) {
    this.listOfCitiesSource.next(cities);
  }
  resetCities(){
    this.listOfCitiesSource.next(this.oldCities) ;
  }
  changePageSize(size) {
    this.pageSizeSource.next(size);
  }
  resetPageSize(){
    this.pageSizeSource.next(0) ;
  }
  changePageIndex(size) {

    this.pageIndexSource.next(size);
  }
  resetPageIndex(){
    this.pageIndexSource.next(0) ;
  }
  changeUsers(users:any[]) {
    this.usersSource.next(users);
  }
  resetUsers(){
    this.listOfCitiesSource.next(this.oldUsers) ;
  }
  changeFilteredData(filteredData:any) {
    this.filteredDataSource.next(filteredData);
  }



  resetFilteredData(){
    this.filteredDataSource.next(this.oldFilteredData);
  }

}
