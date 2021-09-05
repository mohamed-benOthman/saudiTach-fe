import { Injectable } from '@angular/core';
import { User } from './interfaces/User';
import { UserService } from './user.service';

@Injectable()
export class StorageService {

  constructor(private userService: UserService) { }

  private removeBase(key: string) {
    localStorage.removeItem(key);
  }

  private setBase(key: string, value: any, is_object: boolean) {
    if (is_object) {
      if (value == null || value === '') {
        localStorage.setItem(key, '');
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } else {
      localStorage.setItem(key, value);
    }
  }

  private getBase(key: string, isObject: boolean = false, defaultResponse: any = null) {
    const value: string = localStorage.getItem(key);

    if (isObject) {
      if (value == null || value.trim() === '') {
        return defaultResponse;
      } else {
        return JSON.parse(value);
      }
    } else {
      return value;
    }
  }

  public setAccessToken(data: string) {
    this.setBase('access_token', data, false);
  }

  public getAccessToken() {
    return this.getBase('access_token', false);
  }

  public setUrlBack(url: string) {
    this.setBase('url_back', url, false);
  }

  public getUrlBack() {
    const url: string = this.getBase('url_back', false);
    this.removeBase('url_back');
    return url;
  }

  public setRoles(data: any) {
    this.setBase('roles', data, false);
  }

  public getRoles() {
    return this.getBase('roles', false);
  }

  public setPageSettings(data: any) {
    this.setBase('pageSettings', data, true);
  }

  public getPageSettings() {
    this.getBase('pageSettings', true);
  }

  public clearPageSettings() {
    this.setPageSettings('');
  }

  public setCurrentProfile(data: any) {
    this.setBase('current_user', data, true);
  }

  public  getCurrentProfile(): any {
    return this.getBase('current_user', true);
  }

  public setCurrentOpenUser(data: any) {
    this.setBase('open_user', data, true);
  }

  public getCurrentOpenUser(): User {
    return this.getBase('open_user', true);
  }

  public setLanguage(data: string) {
    this.setBase('language', data, false);
  }

  public getLanguage() {
    return this.getBase('language');
  }

  public clearAll() {
    this.setAccessToken('');
    this.setUrlBack('');
    this.setRoles('');
    this.setCurrentProfile('');
    this.setPageSettings('');
  }
}
