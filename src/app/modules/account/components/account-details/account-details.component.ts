import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccountType } from 'src/app/shared/models/account-type';
import { ContactType } from 'src/app/shared/models/contact-type';
import { AuthEvent, EventBusService } from 'src/app/shared/services/event-bus.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit,AfterViewInit, OnChanges {
  contact?: any;
  constructor(private eventBusSrv:EventBusService,private cdRef:ChangeDetectorRef){

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.eventBusSrv.on(AuthEvent.loadUserData,(data:AccountType)=>{
      if(data){
        this.contact = data['contact'];
        this.cdRef.detectChanges();
      }
    })
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
  
  
}
