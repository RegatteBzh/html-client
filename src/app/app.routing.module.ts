import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: 'app/views/login/login.module#LoginModule' },
  { path: 'dashboard',  loadChildren: 'app/views/dashboard/dashboard.module#DashboardModule' },
  { path: 'skipper',  loadChildren: 'app/views/skipper/skipper.module#SkipperModule' },
  { path: 'me',  loadChildren: 'app/views/me/me.module#MeModule' },
  { path: 'logs',  loadChildren: 'app/views/logs/logs.module#LogsModule' },
  { path: 'admin',  loadChildren: 'app/views/admin/admin.module#AdminModule' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
