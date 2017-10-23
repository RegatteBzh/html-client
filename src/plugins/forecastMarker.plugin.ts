import { Marker, Icon, LatLngExpression } from 'leaflet';

class MarkerIcon extends Icon {
    constructor() {
        super({
            iconUrl: ''
        });
    }

    createIcon(oldIcon?: HTMLElement): HTMLElement {
        const div = (oldIcon && oldIcon.tagName === 'DIV' ? oldIcon : document.createElement('div'));
        const style = div.getAttribute('style');
        div.setAttribute('style', `${style};margin-left:-7px;margin-top:-7px;position:absolute`);
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', '10');
        svg.setAttribute('height', '10');
        div.appendChild(svg);
        const g = document.createElementNS(svgNS, 'g');
        svg.appendChild(g);
        const line1: SVGGElement = document.createElementNS(svgNS, 'path');
        line1.setAttribute('d', 'M 0,10 10,0');
        line1.setAttribute('style', 'stroke:#ff0000;stroke-width:3');
        const line2: SVGGElement = document.createElementNS(svgNS, 'path');
        line2.setAttribute('d', 'M 10,10 0,0');
        line2.setAttribute('style', 'stroke:#ff0000;stroke-width:3');
        g.appendChild(line1);
        g.appendChild(line2);
        return div;
    }
}

export class ForecastMarker extends Marker {
    public _svgIcon: MarkerIcon;
    constructor(latlng: LatLngExpression) {
        const _svgIcon = new MarkerIcon();
        super(latlng, {
            icon: _svgIcon
        });
        this._svgIcon = _svgIcon;
    }

    setPosition(latlng: LatLngExpression) {
        this.setLatLng(latlng);
    }
}