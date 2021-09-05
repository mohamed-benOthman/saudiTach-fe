import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PartnersComponent } from './partners/partners.component';
import { LoginComponent } from './login/login.component';
import { GoogleComponent } from './login/google/google.component';
import { TwitterComponent } from './login/twitter/twitter.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditPersonalComponent } from './profile/edit-personal/edit-personal.component';
import { AboutMeComponent } from './profile/about-me/about-me.component';
import { SocialLinksComponent } from './profile/social-links/social-links.component';
import { SkillsComponent } from './profile/skills/skills.component';
import { ExpertiseComponent } from './profile/expertise/expertise.component';
import { PhotoUploadComponent } from './profile/photo-upload/photo-upload.component';
import { OpenProfileComponent } from './open-profile/open-profile.component';
import { ContactComponent } from './open-profile/contact/contact.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { NewPassResetComponent } from './new-pass-reset/new-pass-reset.component';
import { FaqComponent } from './faq/faq.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';
import {LinkedinComponent} from './login/linkedin/linkedin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'profiles/open', component: OpenProfileComponent },
  { path: 'profiles/open/contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile/edit-personal', component: EditPersonalComponent, canActivate: [AuthGuardService] },
  { path: 'profile/expertise', component: ExpertiseComponent, canActivate: [AuthGuardService] },
  { path: 'profile/skills', component: SkillsComponent, canActivate: [AuthGuardService] },
  { path: 'profile/social-links', component: SocialLinksComponent, canActivate: [AuthGuardService] },
  { path: 'profile/about-me', component: AboutMeComponent, canActivate: [AuthGuardService] },
  { path: 'profile/photo', component: PhotoUploadComponent, canActivate: [AuthGuardService] },
  { path: 'profile/security', component: ChangePasswordComponent, canActivate: [AuthGuardService] },
  { path: 'verifyEmail/:token', component: VerifyEmailComponent},
  { path: 'us', component: AboutusComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ResetPassComponent },
  { path: 'reset/:token', component: NewPassResetComponent },
  { path: 'signup/:user', component: SignupComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'api/auth/google/callback', component: GoogleComponent },
  { path: 'auth/twitter/callback', component: TwitterComponent },
  { path: 'auth/linkedin/callback', component: LinkedinComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'faq', component: FaqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
