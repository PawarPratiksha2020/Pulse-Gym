import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHeader } from './staff-header';

describe('StaffHeader', () => {
  let component: StaffHeader;
  let fixture: ComponentFixture<StaffHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
