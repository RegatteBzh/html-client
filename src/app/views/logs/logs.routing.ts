import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LogsComponent } from './logs.component';


const routes: Routes = [
    {
        path: '',
        component: LogsComponent,
    }
];

export const logsRouting: ModuleWithProviders = RouterModule.forChild(routes);