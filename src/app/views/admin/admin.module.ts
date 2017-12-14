import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RaceComponent } from './race/race.component';
import { OverviewComponent } from './overview/overview.component';
import { PlayerComponent } from './player/player.component';
import { FormsModule } from '@angular/forms';
import { adminRouting } from './admin.routing';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {SuiModule} from 'ng2-semantic-ui';
import { YagaModule } from '@yaga/leaflet-ng2';

@NgModule({
    declarations: [
        AdminComponent,
        RaceComponent,
        OverviewComponent,
        PlayerComponent,
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
