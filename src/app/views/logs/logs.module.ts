import { NgModule } from '@angular/core';
import { LogsComponent } from './logs.component';
import { FormsModule } from '@angular/forms';
import { logsRouting } from './logs.routing';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {SuiModule} from 'ng2-semantic-ui';

@NgModule({
    declarations: [
        LogsComponent,
    ],
    imports: [
        logsRouting,
        FormsModule,
        TranslateModule,
        CommonModule,
        SuiModule,
    ],
    providers: [

    ]
})
export class LogsModule {
}