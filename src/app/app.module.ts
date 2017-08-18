import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PlatformRef } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { YagaModule } from '@yaga/leaflet-ng2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceComponent } from './race/race.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RaceComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    YagaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
