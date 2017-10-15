import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login.component';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: ':token',
        component: LoginComponent
    }
];

export const loginRouting: ModuleWithProviders = RouterModule.forChild(routes);
