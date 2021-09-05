import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserApiService } from './user-api.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  /*constructor(public auth: UserApiService, public router: Router, private route: ActivatedRoute, public storageService: StorageService) {}
  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
        this.auth.isAuthenticated().subscribe(resp => {
            const result: any = resp;
            this.storageService.setCurrentProfile(result.data);

            resolve(true);
        }, () => {
            this.storageService.setCurrentProfile('');
            this.router.navigate(['']);
            resolve(false);
        });
    });
  }*/
    constructor(private router: Router) {}
    canActivate(): boolean {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
            return false;
        } else { return true; }
    }
}
