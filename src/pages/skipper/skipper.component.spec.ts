import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipperPage } from './skipper.component';

describe('SkipperPage', () => {
  let component: SkipperPage;
  let fixture: ComponentFixture<SkipperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkipperPage ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
