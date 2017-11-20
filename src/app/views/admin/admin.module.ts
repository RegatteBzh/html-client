import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RaceComponent } from './race/race.component';
import { FormsModule } from '@angular/forms';
import { adminRouting } from './admin.routing';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {SuiModule} from 'ng2-semantic-ui';

@NgModule({
    declarations: [
        AdminComponent,
        RaceComponent,
    ],
    imports: [
        adminRouting,
        FormsModule,
        TranslateModule,
        CommonModule,
        SuiModule,
    ],
    providers: [

    ]
})
export class AdminModule {
}