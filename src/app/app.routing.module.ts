import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RaceComponent } from './views/race/race.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/:token', component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'race/:id',  component: RaceComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
