import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountType } from 'src/app/shared/models/account-type';
import { ApiService } from 'src/app/shared/services/api.service';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
import { AuthService } from 'src/common/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private apiSrv:ApiService) {

  }

  createAccount():Observable<any>{
    return this.apiSrv.post("", {});
  }
}
