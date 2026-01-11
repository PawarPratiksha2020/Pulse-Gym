import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StaffHeader } from "./staff-header/staff-header";
import { FormsModule } from '@angular/forms';
import { Attendance } from '../Model/staffModel';
import { StaffattendenceServices } from '../Services/staffattendence';
import { MatFormField, MatSelect, MatOption, MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from "ag-grid-angular";

@Component({
  selector: 'app-satff',
  imports: [NgClass, NgIf, NgFor, StaffHeader, FormsModule, MatFormField, MatSelect, MatOption, MatSelectModule, MatFormFieldModule, AgGridAngular],
  templateUrl: './satff.html',
  styleUrl: './satff.css',
})
export class Satff implements OnInit {
  staff = [
    {
      img: 'assets/user1.jpg',
      name: 'John Doe',
      id: 'ID-001',
      role: 'Senior Trainer',
      status: 'Active',
      clients: 24,
      rating: 4.9
    },
     {
      img: 'assets1/user1.jpg',
      name: 'Pratiksha',
      id: 'ID-002',
      role: 'Senior Trainer',
      status: 'In Class',
      clients: 20,
      rating: 4.5
    },
     {
      img: 'assets/user1.jpg',
      name: 'Shubham K',
      id: 'ID-003',
      role: 'Yoga Instructor',
      status: 'Active',
      clients: 25,
      rating: 5.0
    },
     {
      img: 'assets/user1.jpg',
      name: 'John Pandy',
      id: 'ID-004',
      role: 'Fintess Coach',
      status: 'On Shift',
      clients: 10,
      rating: 4.9
    },
    {
      img: 'assets/user2.jpg',
      name: 'Jane Smith',
      id: 'ID-005',
      role: 'Floor Manager',
      status: 'On Shift',
      clients: 18,
      rating: 4.7
    },
    {
      img: 'assets/user3.jpg',
      name: 'Emily R.',
      id: 'ID-018',
      role: 'Yoga Instructor',
      status: 'In Class',
      clients: 12,
      rating: 4.6
    }
  ];

  rowData: any[] = [];

  // =======================
  // AG GRID COLUMNS
  // =======================
  columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      flex: 3,
      minWidth:250,
      cellRenderer: (params: any) => {
        const img = params.data.img || 'assets/default-user.png';
        const name = params.data.name || '';

        return `
      <div style="display:flex; align-items:center; gap:10px">
        <img src="${img}" 
             style="width:36px;height:36px;border-radius:50%" />
        <span>${name}</span>
      </div>
    `;
      }

    },
    { field: 'role', headerName: 'Role' },

    {
      field: 'status',
      headerName: 'Status',
      cellRenderer: (p: any) => {
        const c =
          p.value === 'Active' ? '#22c55e' :
            p.value === 'On Shift' ? '#38bdf8' :
              '#facc15';

        return `
          <span class="status-badge" style="background:${c}20;color:${c}">
            ${p.value}
          </span>
        `;
      }
    },

    { field: 'clients', headerName: 'Clients' },
    { field: 'rating', headerName: 'Rating' },

    {
      headerName: 'Action',
      pinned: 'right',
      width: 160,
      cellRenderer: () => `
        <button class="grid-btn edit">Edit</button>
        <button class="grid-btn delete">Delete</button>
      `,
      onCellClicked: (params: any) => {
        const t = params.event.target as HTMLElement;

        if (t.classList.contains('edit')) {
          this.openEdit(params.data);
        }
        if (t.classList.contains('delete')) {
          this.delete(params.data);
        }
      }
    }
  ];
  rowHeight = 40;
  headerHeight = 48;

  // =======================
  // POPUP STATE
  // =======================
  showAddPopup = false;
  editingStaff: any = null;

  newStaff: any = {};

  ngOnInit() {
    this.rowData = [...this.staff];
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
  }

  // =======================
  // ACTIONS
  // =======================
  openAdd() {
    this.editingStaff = null;
    this.newStaff = {
      img: 'assets/user1.jpg',
      name: '',
      role: '',
      status: 'Active',
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

  saveStaff() {
    if (!this.newStaff.name.trim()) return;

    if (this.editingStaff) {
      Object.assign(this.editingStaff, this.newStaff);
    } else {
      this.newStaff.id = 'ID-' + Math.floor(Math.random() * 999);
      this.staff.push({ ...this.newStaff });
    }

    this.rowData = [...this.staff];
    this.showAddPopup = false;
  }

  delete(s: any) {
    if (!confirm('Delete staff?')) return;
    this.staff = this.staff.filter(x => x !== s);
    this.rowData = [...this.staff];
  }

  trainers = [
    { name: 'John Doe', percent: 98 },
    { name: 'Emily R.', percent: 92 },
    { name: 'Sarah Connor', percent: 86 }
  ];


  get totalStaff() {
    return this.staff.length;
  }

  get activeTrainers() {
    return this.staff.filter(s => s.status === 'Active').length
  }

  load = Array(28).fill(0).map((_, i) => i % 3 === 0 ? 1 : 0);
  // 👉 Existing Staff List (table मधे दिसणारे data)

  staffList1 = [
    { id: 101, name: 'John', role: 'Trainer' },
    { id: 102, name: 'Emily', role: 'Yoga Coach' },
    { id: 103, name: 'Pratiksha', role: 'Cardio Coach' }
  ];

  //  Popup control

  constructor(private attendsvc: StaffattendenceServices) { }

  // Temporary object for new staff
  attendanceList: Attendance[] = [];

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

  closeAdd() {

  }

}


