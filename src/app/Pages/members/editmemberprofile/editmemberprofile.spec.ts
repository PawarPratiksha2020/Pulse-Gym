import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editmemberprofile } from './editmemberprofile';

describe('Editmemberprofile', () => {
  let component: Editmemberprofile;
  let fixture: ComponentFixture<Editmemberprofile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editmemberprofile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editmemberprofile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
