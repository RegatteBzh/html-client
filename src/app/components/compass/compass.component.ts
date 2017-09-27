import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { first } from 'lodash';

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
  }

  @ViewChild('compass')
  public compassSvg: ElementRef;

  constructor() {
    this.mouseDownOnCursor = false;
  }

  getAngle(x: number, y: number) {
    return (360 + Math.atan2(x, y) * 180 / Math.PI) % 360;
  }

  ngOnInit() {
  }

  mouseCursorDown() {
    this.mouseDownOnCursor = true;
  }

  mouseCursorUp() {
    this.mouseDownOnCursor = false;
  }

  mouseCursorMove(event, type: string) {
    if (this.mouseDownOnCursor) {
      let offsetX = 0;
      let offsetY = 0;
      const compassRect = this.compassSvg.nativeElement.getBoundingClientRect();
      switch (type) {
        case 'mouse':
          offsetX = event.offsetX;
          offsetY = event.offsetY;
          break;
        case 'touch':
          const touch: any = first(event.touches);
          if (touch) {
            offsetX = touch.clientX - (compassRect.x || compassRect.left);
            offsetY = touch.clientY - (compassRect.y || compassRect.top);
            event.stopPropagation();
            event.preventDefault();
          }
          break;
        default:
      }
      const x = offsetX - (compassRect.width / 2);
      const y = (compassRect.width / 2) - offsetY;
      if (!x && !y) {
        return;
      }
      this.direction = Math.round(this.getAngle(x, y));
      this.directionChange.emit(this.directionValue);
    }
  }

  getRotation() {
    return `rotate(${this.direction || 0})`;
  }

}
