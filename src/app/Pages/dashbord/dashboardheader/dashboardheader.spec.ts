import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboardheader } from './dashboardheader';

describe('Dashboardheader', () => {
  let component: Dashboardheader;
  let fixture: ComponentFixture<Dashboardheader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboardheader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboardheader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
