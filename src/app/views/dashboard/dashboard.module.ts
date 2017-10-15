import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { dashboardRouting } from './dashboard.routing';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        dashboardRouting,
        TranslateModule,
    ],
    providers: [

    ]
})
export class DashboardModule {
}
