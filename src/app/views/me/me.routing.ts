import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MeComponent } from './me.component';


const routes: Routes = [
    {
        path: '',
        component: MeComponent,
    }
];

export const meRouting: ModuleWithProviders = RouterModule.forChild(routes);
