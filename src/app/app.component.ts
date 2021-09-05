import {ChangeDetectorRef, Component, OnDestroy, ViewChild, OnInit, HostListener} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';
import {BaseService} from './services/base.service';
import {StorageService} from './services/storage.service';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {UserApiService} from 'src/app/services/user-api.service';
import {User} from 'src/app/services/interfaces/User';
import {UserService} from './services/user.service';

import {Md5} from 'ts-md5/dist/md5';
import {Subscription} from 'rxjs';
import {DataServiceService} from './services/data-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', './signup/signup.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    constructor(
        public translateService: TranslateService,
        private baseService: BaseService,
        public changeDetectorRef: ChangeDetectorRef,
        public media: MediaMatcher,
        public  storageService: StorageService,
        private router: Router,
        private userApiService: UserApiService,
        private dataService:DataServiceService,
        public userService: UserService
    ) {

        this.isMobile = true;
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this.mobileQueryListener);
        this.arabicVisible=(window.innerWidth-270).toString()+'px';

    this.width=window.innerWidth;
        this.arabicInvisible=(window.innerWidth).toString()+'px';
        console.log(this.arabicInvisible);
        console.log(this.arabicVisible);
        this.lang = this.storageService.getLanguage();
        console.log(this.storageService.getLanguage());
        if (!this.lang) {
            this.storageService.setLanguage('ar');
            this.lang = 'ar';
        }

        translateService.setDefaultLang(this.lang);



        this.subscription = this.userApiService.currentAuthenticated.subscribe((authenticated: boolean) => {
            this.isAuthenticated = authenticated;
            const profile = localStorage.getItem('current_user');
            this.myProfile = profile;
        });
        console.log(localStorage.getItem('access_token'));

        if (localStorage.getItem('access_token')) {
            console.log(localStorage.getItem('access_token'));

            this.isAuthenticated = true;
            const profile = localStorage.getItem('current_user') ;
            this.myProfile = profile;
        }



        this.baseService.stopLoading();



    }
    width:any;
    arabicVisible:any ;
    toProfiles() {




        this.userApiService.getUsers().subscribe(((resp:any) => {


                const result: any = resp.users;
              const result2 = result.filter(user => (user.activated===true) && (user.confirmed===true));
              console.log('sdadsadsadsalllllll');
              console.log(result2);
                this.dataService.changeUsers(result2);
            }),
            ((error) => {

            }));
    }
    isCondensed = false;

    toggleMenu() {
        this.isCondensed = !this.isCondensed;
        if (this.isCondensed) {
            document.getElementById('navigation').style.display = 'block';
        } else {
            document.getElementById('navigation').style.display = 'none';
        }
    }

    @ViewChild('snav', {static: false}) snav: MatSidenav;

    isAuthenticated: any;
    myProfile: any;
    mobileQuery: MediaQueryList;
    lang: string;
    curUser: User;

    private mobileQueryListener: () => void;
    isMobile: boolean;

   /* getUserPicture() {
        return this.userService.curUser.profile.avatarLink ?
            this.userService.curUser.profile.avatarLink :
            `https://www.gravatar.com/avatar/${this.getEmailHash(this.userService.getUserEmail())}?d=wavatar`
    }*/
    expanded = true;

    ngOnInit() {

        this.curUser = this.storageService.getCurrentProfile();
        this.arabicVisible=(window.innerWidth-270).toString()+'px';
        this.arabicInvisible=(window.innerWidth).toString()+'px';
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this.mobileQueryListener);
    }

    goHome() {
        this.router.navigateByUrl("/")
    }

    switchLanguageClicked() {
        this.lang = this.lang === 'en' ? 'ar' : 'en';
        this.storageService.setLanguage(this.lang);

        this.translateService.use(this.lang);


    }
    arabicInvisible:any;
    logout() {
        this.isAuthenticated = false;
        this.myProfile = {};
        localStorage.removeItem('access_token');
        this.storageService.setCurrentProfile(null);
        if (this.expanded == false) {
        this.collapse();
        }
        this.goHome();
    }

    getEmailHash(email) {
        return Md5.hashStr(email);
    }



    @HostListener('window:resize', ['$event'])
    onResize(event) {


        if (window.innerWidth) {
            this.expanded = true;
        }
        this.width=window.innerWidth;
        this.arabicVisible=(window.innerWidth-270).toString()+'px';
        this.arabicInvisible=(window.innerWidth).toString()+'px';
        console.log(this.width);
        console.log(this.arabicVisible);
    }
    collapse() {
        document.getElementById('navigation').style.display = 'none';
        this.expanded = !this.expanded;
        this.isCondensed=false;
        console.log(this.expanded);
    }
    redirectTo(place) {
        this.toProfiles();
        return this.router.navigate([place]);
    }
}
