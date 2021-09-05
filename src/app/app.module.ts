import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {NgModule} from '@angular/core';
import {A11yModule} from '@angular/cdk/a11y';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfilesComponent, DialogProfilesFilter } from './profiles/profiles.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { FooterComponent } from './footer/footer.component';

import { UserApiService } from './services/user-api.service';
import { BaseService } from './services/base.service';
import { StorageService } from './services/storage.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PartnersComponent } from './partners/partners.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPersonalComponent } from './profile/edit-personal/edit-personal.component';
import { AboutMeComponent } from './profile/about-me/about-me.component';
import { SocialLinksComponent } from './profile/social-links/social-links.component';
import { ExpertiseComponent } from './profile/expertise/expertise.component';
import { SkillsComponent } from './profile/skills/skills.component';
import { PhotoUploadComponent } from './profile/photo-upload/photo-upload.component';
import { OpenProfileComponent } from './open-profile/open-profile.component';
import { ContactComponent } from './open-profile/contact/contact.component';
import { GoogleComponent } from './login/google/google.component';
import { TwitterComponent } from './login/twitter/twitter.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { NewPassResetComponent } from './new-pass-reset/new-pass-reset.component';
import { FaqComponent } from './faq/faq.component';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DevDialogueComponent } from './signup/dev-dialogue/dev-dialogue.component';
import { VerifyComponent } from './verify/verify.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import {AuthService} from 'angularx-social-login';

import {
  GoogleLoginProvider,

} from 'angularx-social-login';
import { TokenInterceptorComponent } from './interceptor/token-interceptor/token-interceptor.component';
import {TokenInterceptorService} from './interceptors/token-interceptor.service';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LinkedinComponent } from './login/linkedin/linkedin.component';
import {getArabicPaginatorIntl} from './profiles/arabic-paginator';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('152517747144-dgvjme894impfms9eh3081j8898q5iid.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfilesComponent,
    ProfileComponent,
    SignupComponent,
    LoginComponent,
    VerifyEmailComponent,
    FooterComponent,
    AboutusComponent,
    PartnersComponent,
    EditPersonalComponent,
    AboutMeComponent,
    SocialLinksComponent,
    ExpertiseComponent,
    SkillsComponent,
    PhotoUploadComponent,
    OpenProfileComponent,
    ContactComponent,
    DialogProfilesFilter,
    GoogleComponent,
    TwitterComponent,
    TermsComponent,
    PrivacyComponent,
    ResetPassComponent,
    NewPassResetComponent,
    FaqComponent,
    HeaderComponent,
    PaginationComponent,
    DevDialogueComponent,
    VerifyComponent,
    TokenInterceptorComponent,
    ChangePasswordComponent,
    SpinnerComponent,
    LinkedinComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,

    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,

    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule
  ],
  providers: [
    UserApiService,
    BaseService,
    StorageService,
    AuthGuardService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },


  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogProfilesFilter, DevDialogueComponent]
})
export class AppModule { }
