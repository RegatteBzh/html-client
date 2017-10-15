import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { YagaModule } from '@yaga/leaflet-ng2';

import { TranslateModule } from '@ngx-translate/core';

// Components
import { CompassComponent } from './compass/compass.component';
import { MapComponent } from './map/map.component';

@NgModule({
    declarations: [
        CompassComponent,
        MapComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        TranslateModule,
        YagaModule,
    ],
    exports: [
        CompassComponent,
        MapComponent,
    ],
    providers: [

    ]
})
export class ComponentsModule {
}
