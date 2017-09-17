import { Layer } from 'leaflet';

const boatLayer = Layer.extend({
    initialize() {
        console.log('yolo');
    },
    onAdd(map) {
        this._canvasLayer = L.canvasLayer().delegate(this);
        this._canvasLayer.addTo(map);
        this._map = map;
    },
    onRemove() { },

    onDrawLayer() {
        if (!this._context) {
            this._initBoat(this);
        }

        // console.log('Draw', this._canvasLayer._map.getBounds());
    },

    _initBoat(self) {
        this._context = this._canvasLayer._canvas.getContext('2d');
        console.log(this._map);
        this._map.on('dragstart', () => this._boatStop());
        this._map.on('dragend', () => this._boatRestart);
        this._map.on('zoomstart', () => this._boatStop());
        this._map.on('zoomend', () => this._boatRestart);
        this._map.on('resize', () => this._boatRestart());
    },

    _boatStop() { },

    _boatRestart() { },
});

L.boatLayer = function () {
    return new boatLayer();
};
