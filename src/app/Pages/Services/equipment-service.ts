import { Injectable } from '@angular/core';
import { Equipment } from '../Model/equipment.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
   private equipmentSource = new BehaviorSubject<Equipment[]>([]);
  equipment$ = this.equipmentSource.asObservable();

  setInitial(list: Equipment[]) {
    this.equipmentSource.next(list);
  }

  add(item: Equipment) {
    this.equipmentSource.next([
      ...this.equipmentSource.value,
      item
    ]);
  }

  update(item: Equipment) {
    this.equipmentSource.next(
      this.equipmentSource.value.map(e =>
        e.id === item.id ? item : e
      )
    );
  }

  delete(id: string) {
    this.equipmentSource.next(
      this.equipmentSource.value.filter(e => e.id !== id)
    );
  }
}
