import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { OAuthStorage } from 'angular-oauth2-oidc';

const LOCAL_STORAGE_OAUTH_PROVIDER = { provide: OAuthStorage, useValue: localStorage };


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard,
        LOCAL_STORAGE_OAUTH_PROVIDER
      ]
    };
  }
 }
