import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserApiService} from '../services/user-api.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css', '../../assets/css/general.css']
})
export class VerifyEmailComponent implements OnInit {
  error = false;
  token: any;
  constructor(private router: Router,   private route: ActivatedRoute, userService: UserApiService) {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);
    userService.confirmUser(this.token).subscribe(
        (res) => {
          this.error = false;
          setTimeout(() => {

          }, 1500);
        }, (err) => {
          this.error = true;
        }
    );
  }

  ngOnInit() {
  }
  navigate() {
     this.router.navigate(['login']);
  }
}
