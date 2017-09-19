import { LatLng, Marker, LatLngExpression } from 'leaflet';
//import { extend } from 'lodash';

/*declare namespace L {
    export function canvasLayer(): any;
    export function boatLayer(latlng: LatLng, bearing: number): any;
    export function setOptions(obj: Class, options: any): any;
}*/

export class BoatLayer extends Marker {
    constructor (latlng: LatLngExpression, bearing: number) {
        super(latlng);
    }


}

// const BoatLayer = Marker.extend({
//     initialize(options: any) {

//         console.log(options);
//         Marker.mergeOptions(options.latlng);
//         //Marker.prototype.initialize.call(this, options.latlng);

//         /*const opts = extend(
//             {
//                 latLng: new LatLng(0, 0),
//                 bearing: 0,
//             },
//             options,
//         );
//         this._latlng = opts.latLng;
//         this.bearing = opts.bearing;*/
//     },
//     /*onAdd(map) {
//         this._canvasLayer = L.canvasLayer().delegate(this);
//         this._canvasLayer.addTo(map);
//         this._map = map;
//     },
//     onRemove() { },

//     onDrawLayer() {
//         if (!this._context) {
//             this._initBoat(this);
//         }

//         // console.log('Draw', this._canvasLayer._map.getBounds());
//     },

//     _initBoat(self) {
//         this._context = this._canvasLayer._canvas.getContext('2d');
//         console.log(this._map);
//         this._map.on('dragstart', () => this._boatStop());
//         this._map.on('dragend', () => this._boatRestart);
//         this._map.on('zoomstart', () => this._boatStop());
//         this._map.on('zoomend', () => this._boatRestart);
//         this._map.on('resize', () => this._boatRestart());
//     },

//     _boatStop() { },

//     _boatRestart() { },*/
// });

/*L.boatLayer = function (latlng: LatLng, bearing: number) {
    return new BoatLayer(latlng, bearing);
};*/
