import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../login/login.component.css']
})
export class ProfileComponent implements OnInit {
  profile2: any;
   getProfile = async () => {
    this.profile2 =  await JSON.parse(localStorage.getItem('current_user'));
  }
  constructor(
    public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public storageService: StorageService
  ) {
     console.log(userService.curUser);
     const profile = this.storageService.getCurrentProfile();
     if (profile) {
      if (profile.profile && (!profile.profile.country || !profile.profile.city)) {
        this.router.navigate(['profile/edit-personal']);
      }
    }
  }

  ngOnInit() {

  }

  getEmailHash(email) {
    return Md5.hashStr(email);
  }

  editUserClicked() {
    this.router.navigate(['edit-personal'], { relativeTo: this.activatedRoute});
  }

  editExpertiseClicked() {
    this.router.navigate(['expertise'], { relativeTo: this.activatedRoute});
  }

  editSkillsClicked() {
    this.router.navigate(['skills'], { relativeTo: this.activatedRoute});
  }
  editSecurityClicked() {
    this.router.navigate(['security'], { relativeTo: this.activatedRoute});
  }

  editSocialLinksClicked() {
    this.router.navigate(['social-links'], { relativeTo: this.activatedRoute});
  }

  editAboutMeClicked() {
    this.router.navigate(['about-me'], { relativeTo: this.activatedRoute});
  }

  editPhotoClicked() {
    this.router.navigate(['photo'], { relativeTo: this.activatedRoute});
  }

  getUserPicture() {

    return this.userService.curUser.avatarLink ?
    this.userService.curUser.avatarLink :
        'https://avatars.dicebear.com/api/avataaars/'+this.getEmailHash(this.userService.curUser.email)+'.svg?b=%23ddffd1&top[]=shortHair&top[]=hat&top[]=eyepatch&topChance=55&accessories[]=sunglasses&accessoriesColor[]=black&accessoriesColor[]=blue&accessoriesColor[]=blue01&facialHair[]=moustacheMagnum&facialHair[]=beardMajestic&facialHair[]=beardMedium&facialHair[]=medium&facialHairChance=52';;
;
  }
}
