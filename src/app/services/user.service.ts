import { Injectable } from '@angular/core';
import { User } from './interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public curUser: any;

  constructor() {
    if (localStorage.getItem('current_user')) {
    this.curUser = JSON.parse(localStorage.getItem('current_user'));
    }
  }

  public getCurUserFullName() {
    return this.curUser ? `${this.curUser.firstName} ${this.curUser.lastName}` : null;
  }

  public getUserEmail() {
    return this.curUser ? this.curUser.email : '';
  }
}
