import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { YagaModule } from '@yaga/leaflet-ng2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceComponent } from './race/race.component';
import { MapComponent } from './map/map.component';

import { RaceService } from './race/race.service';
import { MapService } from './map/map.service';
import { ConfigService } from './config.service';


import { CompassComponent } from './compass/compass.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RaceComponent,
    MapComponent,
    CompassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    YagaModule,
    HttpModule
  ],
  providers: [
    ConfigService,
    RaceService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
