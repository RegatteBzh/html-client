import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceComponent } from './race.component';

describe('LoginComponent', () => {
  let component: RaceComponent;
  let fixture: ComponentFixture<RaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
