import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Satff } from './satff';

describe('Satff', () => {
  let component: Satff;
  let fixture: ComponentFixture<Satff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Satff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Satff);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
