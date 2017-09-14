import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipperComponent } from './skipper.component';

describe('SkipperComponent', () => {
  let component: SkipperComponent;
  let fixture: ComponentFixture<SkipperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkipperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
