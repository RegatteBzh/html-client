import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }

  mapLayers() {
    return [
      {
        name: 'Satellite',
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      },
      {
        name: 'blue-marble',
        url: 'http://s3.amazonaws.com/com.modestmaps.bluemarble/{z}-r{y}-c{x}.jpg',
        info: 'http://polymaps.org/ex/blue-marble.html'
      },
      {
        name: 'Topo',
        url: 'https://b.tile.opentopomap.org/{z}/{x}/{y}.png'
      },
      {
        name: 'Basic',
        url: 'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png'
      },
      {
        name: 'Etopo ocean',
        url: 'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}'
      },
      {
        name: 'Etopo streets',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png'
      },
      {
        name: 'Etopo light gray',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
      },
      {
        name: 'Etopo dark gray',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
      },
      {
        name: 'Etopo national-geographics',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
      },
      {
        name: 'Etopo world imagery',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      },
      {
        name: 'Thunder forest a',
        url: 'https://a.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d'
      },
      {
        name: 'Thunder forest b',
        url: 'https://b.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d'
      },
      {
        name: 'Thunder forest c',
        url: 'https://c.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d'
      }
    ];
  }

}
