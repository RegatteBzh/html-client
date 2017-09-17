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
        console.log('Draw');
    },
});

L.boatLayer = function() {
    return new boatLayer();
};
