import { NgModule } from '@angular/core';
import { MeComponent } from './me.component';
import { FormsModule} from '@angular/forms';
import { meRouting } from './me.routing';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        MeComponent,
    ],
    imports: [
        meRouting,
        FormsModule,
        TranslateModule,
    ],
    providers: [

    ]
})
export class MeModule {
}
