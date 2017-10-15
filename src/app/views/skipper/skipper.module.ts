import { NgModule } from '@angular/core';
import { SkipperComponent } from './skipper.component';
import { skipperRouting } from './skipper.routing';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        SkipperComponent,
    ],
    imports: [
        ComponentsModule,
        skipperRouting,
        TranslateModule,
        FormsModule,
        CommonModule,
    ],
    providers: [

    ]
})
export class SkipperModule {
}
