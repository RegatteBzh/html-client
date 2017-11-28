import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RaceComponent } from './race/race.component';
import { OverviewComponent } from './overview/overview.component';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
    },
    {
        path: 'race',
        component: RaceComponent,
    },
    {
        path: 'overview',
        component: OverviewComponent,
    }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(routes);
