import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquipmentDialog } from './add-equipment-dialog';

describe('AddEquipmentDialog', () => {
  let component: AddEquipmentDialog;
  let fixture: ComponentFixture<AddEquipmentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEquipmentDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEquipmentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
