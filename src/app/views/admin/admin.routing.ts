import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRaceComponent } from './race/admin-race.component';
import { AdminRaceNewComponent } from './race/new/admin-race-new.component';
import { AdminOverviewComponent } from './overview/admin-overview.component';
import { AdminPlayerComponent } from './player/admin-player.component';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
    },
    {
        path: 'race',
        component: AdminRaceComponent,
    },
    {
        path: 'race/new',
        component: AdminRaceNewComponent,
    },
    {
        path: 'overview',
        component: AdminOverviewComponent,
    },
    {
        path: 'player',
        component: AdminPlayerComponent,
    }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(routes);
