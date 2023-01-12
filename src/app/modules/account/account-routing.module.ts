import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountComponent } from './components/account/account.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';

const routes: Routes = [
  {
    path: '', 
    component: AccountComponent,
    children: [
      { path: 'account-detail', component: AccountDetailsComponent },
      { path: 'edit-account', component: EditAccountComponent },
      {path: 'create-account', component: CreateAccountComponent  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
