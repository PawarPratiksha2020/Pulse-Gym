import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Equipment } from '../../Model/equipment.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-equipment-dialog',
  imports: [FormsModule],
  templateUrl: './add-equipment-dialog.html',
  styleUrl: './add-equipment-dialog.css',
})
export class AddEquipmentDialog {
 data: Equipment = {
    id: '',
    name: '',
    zone: '',
    status: 'FREE',
    duration: 0,
  
  };

  constructor(private ref: MatDialogRef<AddEquipmentDialog>) {}

  save() {
    this.data.id = 'EQ-' + Math.floor(Math.random() * 1000);
    this.ref.close(this.data);
  }
  close(){
    this.ref.close();
  }
}
