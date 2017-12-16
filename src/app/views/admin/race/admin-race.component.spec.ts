import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRaceComponent } from './admin-race.component';

describe('AdminRaceComponent', () => {
  let component: AdminRaceComponent;
  let fixture: ComponentFixture<AdminRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
