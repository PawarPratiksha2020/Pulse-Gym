import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Finace } from './finace';

describe('Finace', () => {
  let component: Finace;
  let fixture: ComponentFixture<Finace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Finace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Finace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
