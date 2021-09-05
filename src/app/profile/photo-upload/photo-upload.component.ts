import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    const profile = this.storageService.getCurrentProfile();
    if (profile) {
      if (profile.profile && (!profile.profile.country || !profile.profile.city)) {
        this.router.navigate(['profile/edit-personal']);
      }
    }
  }

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigate(['profile']);
  }

}
