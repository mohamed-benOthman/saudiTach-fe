import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BaseService {

  public model: any;
  public isLoading: boolean;

  private loggedInSource = new BehaviorSubject(false);
  loggedIn = this.loggedInSource.asObservable();
  private loggedInProfile = new BehaviorSubject(null);
  currentProfile = this.loggedInProfile.asObservable();

  constructor(
    private translate: TranslateService) {

    translate.onLangChange.subscribe(() => { });
    this.isLoading = false;

  }

  public startLoading(): void {
    this.isLoading = true;
    document.getElementById('loader').style.display = 'block';
  }

  public stopLoading(): void {
    this.isLoading = false;
    document.getElementById('loader').style.display = 'none';
  }

  public emitLoggedIn(status: boolean) {
    this.loggedInSource.next(status);
  }

  public emitProfile(current: any) {
    this.loggedInProfile.next(current);
  }
}
