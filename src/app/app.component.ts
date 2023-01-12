import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/common/auth/services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'oidc2version2';
  data:any= "";
  isLoggedIn$:Observable<boolean>;
  isLoggedIn:boolean = false;
  userInfo:any;
  constructor(private authService:AuthService){
    this.userInfo = this.authService.userInfo;
    this.isLoggedIn$ = this.authService._hasAccessToken$;
    this.isLoggedIn = this.authService._isLoggedIn;
  }
  ngOnInit(){
    this.isLoggedIn$.subscribe(console.log);
    this.authService._isLoggedIn$.subscribe(isLoggedIn=>{
      this.isLoggedIn= isLoggedIn;
    })
  }
  ngOnDestroy(){

  }
  login() {
    this.authService.login();
  }
  
  logOut() {
    this.authService.logOut();
  }

}
