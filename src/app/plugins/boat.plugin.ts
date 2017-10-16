import { LatLng, Marker, Icon, LatLngExpression } from 'leaflet';

class BoatIcon extends Icon {
    private _iconPath: SVGGElement;
    private _angle = 90;
    constructor() {
        super({
            iconUrl: ''
        });
    }

    createIcon(oldIcon?: HTMLElement): HTMLElement {
        const div = (oldIcon && oldIcon.tagName === 'DIV' ? oldIcon : document.createElement('div'));
        const style = div.getAttribute('style');
        div.setAttribute('style', `${style};margin-left:-25px;margin-top:-25px;position:absolute`);
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', '50');
        svg.setAttribute('height', '50');
        div.appendChild(svg);
        const g = document.createElementNS(svgNS, 'g');
        g.setAttribute('transform', 'translate(25, 25)');
        svg.appendChild(g);
        this._iconPath = document.createElementNS(svgNS, 'path');
        this._iconPath.setAttribute('d', 'm 16,6 c 0,-6 0,-6 0,-12 -14,0 -14,0 -32,6 18,6 18,6 32,6 z');
        this._iconPath.setAttribute('style', 'fill:#219bff;stroke:#2535b3;stroke-width:1');
        this._iconPath.setAttribute('transform', `rotate(${this._angle || 0})`);
        g.appendChild(this._iconPath);
        this.setRotation(0);
        return div;
    }

    setRotation(angle) {
        const normalizedAngle = (90 + (angle || 0)) % 360;
        if (!this._iconPath) {
            return;
        }
        this._angle = normalizedAngle;
        this._iconPath.setAttribute('transform', `rotate(${this._angle || 0})`);
    }
}

export class BoatMarker extends Marker {
    public _svgIcon: BoatIcon;
    constructor(latlng: LatLngExpression, bearing: number) {
        const _svgIcon = new BoatIcon();
        super(latlng, {
            icon: _svgIcon
        });
        this._svgIcon = _svgIcon;
    }

    setRotation(angle) {
        this._svgIcon.setRotation(angle);
    }

    setPosition(latlng: LatLngExpression) {
        this.setLatLng(latlng);
    }
}
