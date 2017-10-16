import { NgModule } from '@angular/core';
import { MeComponent } from './me.component';
import { FormsModule } from '@angular/forms';
import { meRouting } from './me.routing';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {SuiModule} from 'ng2-semantic-ui';

@NgModule({
    declarations: [
        MeComponent,
    ],
    imports: [
        meRouting,
        FormsModule,
        TranslateModule,
        CommonModule,
        SuiModule,
    ],
    providers: [

    ]
})
export class MeModule {
}
