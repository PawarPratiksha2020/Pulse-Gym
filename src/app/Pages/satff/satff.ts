import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { StaffHeader } from "./staff-header/staff-header";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-satff',
  imports: [NgClass, NgIf, NgFor, StaffHeader, FormsModule],
  templateUrl: './satff.html',
  styleUrl: './satff.css',
})
export class Satff {

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
  staff = [
    { img: 'assets/user1.jpg', name: 'John Doe', id: 'ID-001', role: 'Senior Trainer', status: 'Active', statusClass: 'active', clients: 24, rating: 4.9 },
    { img: 'assets/user2.jpg', name: 'Jane Smith', id: 'ID-004', role: 'Floor Manager', status: 'On Shift', statusClass: 'shift', clients: 18, rating: 4.7 },
    { img: 'assets/user3.jpg', name: 'Emily R.', id: 'ID-018', role: 'Yoga Instructor', status: 'In Class', statusClass: 'class', clients: 12, rating: 4.6 }
  ];

  // 👉 Popup control
  showAddPopup = false;
  editingStaff: any = null;

  // 👉 Temporary object for new staff
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

  openEdit(s:any){
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
  
  delete(s:any) {
     if(confirm("Delete this staff member?")){
      this.staff = this.staff.filter(x => x !== s);
    }
   }


}


