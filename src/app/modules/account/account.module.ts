import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './components/account/account.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';



@NgModule({
  declarations: [
    AccountComponent,
    AccountDetailsComponent,
    EditAccountComponent,
    CreateAccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
