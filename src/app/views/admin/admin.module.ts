import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRaceComponent } from './race/admin-race.component';
import { AdminRaceNewComponent } from './race/new/admin-race-new.component';
import { AdminOverviewComponent } from './overview/admin-overview.component';
import { AdminPlayerComponent } from './player/admin-player.component';
import { FormsModule } from '@angular/forms';
import { adminRouting } from './admin.routing';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {SuiModule} from 'ng2-semantic-ui';
import { YagaModule } from '@yaga/leaflet-ng2';

@NgModule({
    declarations: [
        AdminComponent,
        AdminRaceComponent,
        AdminRaceNewComponent,
        AdminOverviewComponent,
        AdminPlayerComponent,
    ],
    imports: [
        adminRouting,
        FormsModule,
        TranslateModule,
        CommonModule,
        SuiModule,
        YagaModule,
    ],
    providers: [

    ]
})
export class AdminModule {
}
