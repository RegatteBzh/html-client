import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SkipperComponent } from './skipper.component';


const routes: Routes = [
    {
        path: ':id',
        component: SkipperComponent,
    }
];

export const skipperRouting: ModuleWithProviders = RouterModule.forChild(routes);
