import { Injectable } from '@angular/core';
import { Attendance } from '../Model/staffModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffattendenceServices {
   private _attendance = new BehaviorSubject<Attendance[]>([]);
  attendance$ = this._attendance.asObservable();

  setAttendance(list: Attendance[]) {
    this._attendance.next(list);
  }

  update(att: Attendance) {
    const list = [...this._attendance.value];
    const i = list.findIndex(x => x.staffId === att.staffId);
    if (i > -1) list[i] = { ...att };
    this._attendance.next(list);
  }
}
