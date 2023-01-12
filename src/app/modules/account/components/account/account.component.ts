import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountType } from 'src/app/shared/models/account-type';
import { AuthEvent, EventBusService } from 'src/app/shared/services/event-bus.service';
import { AccountService } from '../../services/account.service';
import { AccountActionsEnum } from '../enums/account-actions-enum';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit,AfterViewInit {
  AccountActionsEnum = AccountActionsEnum
  accountAction:number =1;
  constructor(private accountSrv: AccountService,private eventBusSrv:EventBusService,private cdRef:ChangeDetectorRef) {
  }

  ngOnInit(){

  }

  ngAfterViewInit(){

  }

  selectAccountAction(action:number){
    this.accountAction = action;
    this.cdRef.detectChanges();
  }
}
