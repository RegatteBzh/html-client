import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RaceComponent } from './race/race.component';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
    },
    {
        path: 'race',
        component: RaceComponent,
    }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(routes);
