import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StaffHeader } from "./staff-header/staff-header";
import { FormsModule } from '@angular/forms';
import { Attendance } from '../Model/staffModel';
import { StaffattendenceServices } from '../Services/staffattendence';
import { MatFormField, MatSelect, MatOption, MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-satff',
  imports: [NgClass, NgIf, NgFor, StaffHeader, FormsModule, MatFormField, MatSelect, MatOption,MatSelectModule,MatFormFieldModule],
  templateUrl: './satff.html',
  styleUrl: './satff.css',
})
export class Satff implements OnInit {

  trainers = [
    { name: 'John Doe', percent: 98 },
    { name: 'Emily R.', percent: 92 },
    { name: 'Sarah Connor', percent: 86 }
  ];
  attendanceList: Attendance[] = [

  ];

  get totalStaff() {
    return this.staff.length;
  }

  get activeTrainers() {
    return this.staff.filter(s => s.status === 'Active').length
  }

  load = Array(28).fill(0).map((_, i) => i % 3 === 0 ? 1 : 0);
  // 👉 Existing Staff List (table मधे दिसणारे data)
  staff = [
    { img: 'assets/user1.jpg', name: 'John Doe', id: 'ID-001', role: 'Senior Trainer', status: 'Active', statusClass: 'active', clients: 24, rating: 4.9 },
    { img: 'assets/user2.jpg', name: 'Jane Smith', id: 'ID-004', role: 'Floor Manager', status: 'On Shift', statusClass: 'shift', clients: 18, rating: 4.7 },
    { img: 'assets/user3.jpg', name: 'Emily R.', id: 'ID-018', role: 'Yoga Instructor', status: 'In Class', statusClass: 'class', clients: 12, rating: 4.6 }
  ];
  staffList1 = [
    { id: 101, name: 'John', role: 'Trainer' },
    { id: 102, name: 'Emily', role: 'Yoga Coach' },
    { id: 103, name: 'Pratiksha', role: 'Cardio Coach' }
  ];

  //  Popup control
  showAddPopup = false;
  editingStaff: any = null;
  constructor(private attendsvc: StaffattendenceServices) { }
  ngOnInit() {
    this.attendanceList = this.staffList1.map(s => ({
      staffId: s.id,
      name: s.name,
      shiftStart: '09:00',
      shiftEnd: '10:00',
      checkIn: '',
      checkOut: '',
      totalHours: 0,
      overtime: 0,
      status: 'Absent',

      date: new Date().toISOString().slice(0, 10)
    }));

    this.attendsvc.setAttendance(this.attendanceList);

    // subscribe for charts
    this.attendsvc.attendance$.subscribe(list => {
      this.updateChart(list);
    });
  }
  updateChart(list: Attendance[]) {
    throw new Error('Method not implemented.');
  }
  // Temporary object for new staff
  newStaff: any = {
    img: 'assets/user1.jpg',
    name: '',
    id: '',
    role: '',
    status: 'Active',
    statusClass: 'active',
    clients: 0,
    rating: 0
  };

  //  Open popup
  openAdd() {
    this.editingStaff = null;
    this.newStaff = {
      img: 'assets/user1.jpg',
      name: '',
      id: '',
      role: '',
      status: 'Active',
      statusClass: 'active',
      clients: 0,
      rating: 0
    };
    this.showAddPopup = true;
  }
  openEdit(s: any) {
    this.editingStaff = s;
    this.newStaff = { ...s };
    this.showAddPopup = true;
  }
  //  Close popup + reset
  closeAdd() {
    this.showAddPopup = false;
    this.newStaff = {
      img: 'assets/user1.jpg',
      name: '',
      id: '',
      role: '',
      status: 'Active',
      statusClass: 'active',
      clients: 0,
      rating: 0
    };
  }
  // 💾 Save staff row
  saveStaff() {
    if (!this.newStaff.name.trim()) {
      alert("Please enter staff name");
      return;
    }
    // Auto ID generate
    this.newStaff.id = 'ID-' + Math.floor(Math.random() * 999);
    // Status → badge class mapping
    if (this.newStaff.status === 'Active') this.newStaff.statusClass = 'active';
    else if (this.newStaff.status === 'On Shift') this.newStaff.statusClass = 'shift';
    else this.newStaff.statusClass = 'class';
    // Add to list
    this.staff.push({ ...this.newStaff });
    this.closeAdd();
  }

  delete(s: any) {
    if (confirm("Delete this staff member?")) {
      this.staff = this.staff.filter(x => x !== s);
    }
  }
  calculateAttendance(att: Attendance) {

    if (!att.checkIn || !att.checkOut) return;

    const start = new Date(`2024-01-01 ${att.shiftStart}`);
    const end = new Date(`2024-01-01 ${att.shiftEnd}`);
    const inTime = new Date(`2024-01-01 ${att.checkIn}`);
    const outTime = new Date(`2024-01-01 ${att.checkOut}`);

    // total hours
    const diffMs = outTime.getTime() - inTime.getTime();
    att.totalHours = +(diffMs / (1000 * 60 * 60)).toFixed(2);

    // LATE marking
    att.status = inTime > start ? 'Late' : 'Present';

    // OVERTIME calculation
    const shiftHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    att.overtime = att.totalHours > shiftHours
      ? +(att.totalHours - shiftHours).toFixed(2)
      : 0;
  }
  checkIn(att: Attendance) {
    att.checkIn = new Date().toTimeString().slice(0, 5); // HH:mm
    att.status = 'Present';
    this.attendsvc.update(att);
  }
  checkOut(att: Attendance) {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    att.checkOut = new Date().toTimeString().slice(0, 5);
    this.calculateAttendance(att);
    this.attendsvc.update(att)
  }



}


