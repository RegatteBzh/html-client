import { NgModule } from '@angular/core';
import { MeComponent } from './me.component';
import { FormsModule } from '@angular/forms';
import { meRouting } from './me.routing';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';

@NgModule({
    declarations: [
        MeComponent,
    ],
    imports: [
        meRouting,
        FormsModule,
        TranslateModule,
        CommonModule,
        NgSemanticModule,
    ],
    providers: [

    ]
})
export class MeModule {
}
