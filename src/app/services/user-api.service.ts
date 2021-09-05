import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { apiRequests } from '../../constants/api-request';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

@Injectable()
export class UserApiService {

  constructor(
    private http: HttpClient,
    private storageDataService: StorageService,
    private userService: UserService) {
  }

  private authenticatedSource = new BehaviorSubject(false);
  currentAuthenticated = this.authenticatedSource.asObservable();

  public login(email: string, password: string): Observable<HttpResponse<any>> {
    const body = {
      email,
      password,
      grant_type: 'password'
    };

    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.login2 , body);
  }

  public logout() {
    this.storageDataService.setAccessToken('');
    this.storageDataService.setCurrentProfile('');
  }
  public checkUser(email): Observable<HttpResponse<any>> {
    const data = {
      email
    };
    return this.http.post<any>(environment.apiEndpoint + '/api/user/checkEmail' , data);
}
/*
  public checkToken(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + '/api/user/checkResetToken' , data);
  }
*/

  public checkResetToken(resetToken): Observable<HttpResponse<any>> {
    const data = {
      resetToken
    };
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.checkResetToken, data );
  }

  public loginGoogle(email): Observable<HttpResponse<any>> {
    const data = {
      email
    };
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.googleLogin, data);

  }
  public sendContactEmail(data): Observable<HttpResponse<any>> {

    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.sendContactEmail, data);

  }


  public getProfileById(id): Observable<HttpResponse<any>> {
    return  this.http.post<any>(environment.apiEndpoint + apiRequests.user.getProfileById, { id});
  }
  public changeActivation(data): Observable<HttpResponse<any>> {

    return this.http.post<any>(environment.apiEndpoint + '/api/user/changeActivation', data);

  }
  public changePassword(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + '/api/user/changePassword', data);

  }
  public register(user): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.register, user);
  }

  public registerOath(user): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.oathRegister, user);
  }

  public uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', environment.apiEndpoint + '/api/upload', formData, options);
    return this.http.request(req);
  }

  public confirmUser(token): Observable<HttpResponse<any>> {
    const data = {
      token
    };
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.confirmUser, data );
  }
  public update(user): Observable<HttpResponse<any>> {
    return this.http.put<any>(environment.apiEndpoint + apiRequests.user.update + `?key=${environment.tenant}&access_token=${this.storageDataService.getAccessToken()}`, user);
  }
  public updateUser(user): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.update , user);
  }
  changeAuthenticated(authenticated) {
    this.authenticatedSource.next((authenticated));
  }



  public isAuthenticated(): Observable<HttpResponse<any>> {

    let user = this.storageDataService.getCurrentProfile();

    if (!user) {
      user = null;
    } else {
      this.userService.curUser = user;
    }

    return this.http.get<any>(
      environment.apiEndpoint + apiRequests.user.is_authenticated.replace(':username', user ? user.email : null) + `&key=${environment.tenant}&access_token=${this.storageDataService.getAccessToken()}`
    );
  }

  public getUserProfile(userId): Observable<HttpResponse<any>> {
    return this.http.get<any>(environment.apiEndpoint + apiRequests.user.get.replace(':id', userId) + `&key=${environment.tenant}`);
  }

/*  public sendContactEmail(id, what, data): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.sendEmail + `?key=${environment.tenant}`, { id, what, data });
  }*/

  public validateToken(token): Observable<HttpResponse<any>> {
    return this.http.get<any>(environment.apiEndpoint + apiRequests.user.validate + `?token=${token}&key=${environment.tenant}`);
  }

  public forgotPassword(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.forgot, data );
  }

  public addNbVisited(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.addNbVisted, data);
  }

  public resetPassword(data): Observable<HttpResponse<any>> {

    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.reset , data);
  }
  public resend(data): Observable<HttpResponse<any>> {

    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.resendConfirmation , data);
  }

  public countUsers(bodyReq): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.count + `?&key=${environment.tenant}`, bodyReq);
  }

  public listUsers(bodyReq): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.list + `?key=${environment.tenant}`, bodyReq);
  }
  public getUsers(): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.getUsers, {});
  }
  public getFilteredUsers(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.getFilteredUsers, data);
  }

  public checkUsername(username): Observable<HttpResponse<any>> {
    return this.http.get<any>(environment.apiEndpoint + apiRequests.user.checkUsername + `?username=${username}&key=${environment.tenant}`);
  }

  public generateNewToken(usernameOrEmail): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.apiEndpoint + apiRequests.user.emailToken, {email: usernameOrEmail});
  }

  public updatePassword(oldPassword, newPassword, confirmNewPassword): Observable<HttpResponse<any>> {
    const data = {
      id: this.userService.curUser._id,
      oldPassword,
      password: newPassword,
      confirmation: confirmNewPassword
    };
    return this.http.put<any>(environment.apiEndpoint + apiRequests.user.updatePassword + `?key=${environment.tenant}&access_token=${this.storageDataService.getAccessToken()}`, data);
  }

  public googleLogin(): string {
    return environment.apiEndpoint + apiRequests.user.googleLogin + `?key=${environment.tenant}`;
  }

  public googleValidate(params): Observable<HttpResponse<any>> {
    return this.http.get<any>(environment.apiEndpoint + apiRequests.user.googleValidate + `?key=${environment.tenant}&${params}`);
  }

  public twitterLogin(): string {
    return environment.apiEndpoint + apiRequests.user.twitterLogin ;
  }

  public linkedinLogin(): string {
    return environment.apiEndpoint + apiRequests.user.linkedinLogin;
  }

  public twitterValidate(params): Observable<HttpResponse<any>> {
    return this.http.get<any>(environment.apiEndpoint + apiRequests.user.twitterValidate + `?${params}`);
  }
  public linkedinValidate(params): Observable<HttpResponse<any>> {
    return this.http.get<any>(environment.apiEndpoint + apiRequests.user.linkedinValidate + `?${params}`);
  }
}
