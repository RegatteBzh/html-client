import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.css']
})
export class CompassComponent implements OnInit {

  private directionValue = 0;
  private mouseDownOnCursor: boolean;

  @Output() directionChange = new EventEmitter<number>();
  @Input()
  get direction() {
    return this.directionValue;
  }
  set direction(val) {
    this.directionValue = val;
    this.directionChange.emit(this.directionValue);
  }

  @ViewChild('compass')
  public compassSvg: ElementRef;

  constructor() {
    this.mouseDownOnCursor = false;
  }

  getAngle(x: number, y: number) {
    if (x === 0 && y === 0) {
      return 0;
    }
    if (x === 0 && y > 0) {
      return 0;
    }
    if (x === 0 && y < 0) {
      return -180;
    }
    if (x > 0) {
      return 90 - Math.atan(y / x) * 180 / Math.PI;
    }
    if (y < 0 && x > 0) {
      return 90 + Math.atan(y / x) * 180 / Math.PI;
    }
    if (y < 0 && x < 0) {
      return 270 - Math.atan(y / x) * 180 / Math.PI;
    }
    if (y > 0 && x < 0) {
      return 270 - Math.atan(y / x) * 180 / Math.PI;
    }
    return 180 + Math.atan(y / x) * 180 / Math.PI;
  }

  ngOnInit() {
  }

  mouseCursorDown() {
    this.mouseDownOnCursor = true;
  }

  mouseCursorUp() {
    this.mouseDownOnCursor = false;
  }

  mouseCursorMove(event) {
    if (this.mouseDownOnCursor) {
      const x = event.offsetX - 120;
      const y = 120 - event.offsetY;
      this.direction = Math.round(this.getAngle(x, y));
    }
  }

  getRotation() {
    return `rotate(${this.direction || 0})`;
  }

}
