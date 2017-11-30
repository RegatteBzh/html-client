import VelocityLayer from './L.VelocityLayer';

const L = (<any>window).L;

L.VelocityLayer = (L.Layer ? L.Layer : L.Class).extend(new VelocityLayer());
export default function(options: any) {
    return new L.VelocityLayer(options);
}
