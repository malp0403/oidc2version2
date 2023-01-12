import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService, OAuthSuccessEvent, OAuthStorage, OAuthEvent } from 'angular-oauth2-oidc';
import { iif, of, Subject } from 'rxjs';
import { map, filter, } from 'rxjs/operators';
import { AccountType } from 'src/app/shared/models/account-type';
import { AuthEvent, EmitEvent, EventBusService } from 'src/app/shared/services/event-bus.service';

export const authConfig: AuthConfig = {

  issuer: 'https://dev.housingmatters.lmslab.net/id4',

  redirectUri: 'http://localhost:7200/',

  clientId: 'publicweb',

  responseType: 'id_token token',

  scope: 'openid profile email usermanagementapi publicapi chatapi',

  showDebugInformation: true,
};

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class AuthService {
  // private authStorage: OAuthStorage;
  _userInfo: AccountType = new AccountType();
  _userInfo$: Subject<AccountType> = new Subject();
  _hasAccessToken$: Subject<boolean> = new Subject();
  _isLoggedIn: boolean = false;
  _isLoggedIn$: Subject<boolean> = new Subject();
  get accessToken() { return this.oAuth.getAccessToken(); }
  get hasValidAccessToken() { return this.oAuth.hasValidAccessToken(); }
  get userInfo() { return this._userInfo; }

  constructor(private oAuth: OAuthService, private http: HttpClient, private eventBusSrv: EventBusService) {

    this.oAuth.configure(authConfig);
    this.oAuth.loadDiscoveryDocumentAndTryLogin();
    console.log(console.log);

    this.oAuth.events.subscribe(console.log);
    this.oAuth.events.pipe(
      filter((e: OAuthEvent) => e.type === 'discovery_document_loaded'),

    ).subscribe((data) => {
      console.log(" this.oAuth.events.pipe :", data)
    });

    iif(() => !!this.accessToken,
      of(this.accessToken),
      this.oAuth.events.pipe(
        filter((e: OAuthEvent) => e.type === 'token_received'),
        map(() => this.accessToken)
      )
    ).subscribe(accessToken => {

      this._isLoggedIn$.next(true);
      this._isLoggedIn = true;

      console.log("authService-> accessToken: ", accessToken)
      this._hasAccessToken$.next(this.oAuth.hasValidAccessToken());

      var authHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      });
      this.http.post("http://localhost/Connector/api/account/getaccount", {}, { headers: authHeaders }).subscribe((userData) => {
        console.log("userData: ", userData);
        this._userInfo$.next(userData);
        this._userInfo = userData;
        this.eventBusSrv.emit(new EmitEvent(AuthEvent.loadUserData, userData))
      })
    });
  }

  login() {
    this.oAuth.initCodeFlow();
    this._isLoggedIn$.next(true);
    this._isLoggedIn = true;

  }
  logOut() {
    this.oAuth.logOut();
    this._isLoggedIn$.next(false);
    this._isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.oAuth.hasValidAccessToken();
  }

}
