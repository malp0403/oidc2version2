import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/modules/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'module1',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/modules/module1/module1.module').then(m => m.Module1Module)
  },
  {
    path: 'module2',
    loadChildren: () => import('../app/modules/module2/module2.module').then(m => m.Module2Module)
  },
  {
    path: 'module3',
    loadChildren: () => import('../app/modules/module3/module3.module').then(m => m.Module3Module)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
