import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: 'app/views/login/login.module#LoginModule' },
  { path: 'dashboard',  loadChildren: 'app/views/dashboard/dashboard.module#DashboardModule' },
  { path: 'skipper',  loadChildren: 'app/views/skipper/skipper.module#SkipperModule' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
