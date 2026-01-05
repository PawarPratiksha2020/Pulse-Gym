import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EQUIPMENT_LIST } from '../mock/equipment.mock';
import { Equipment } from '../Model/equipment.model';
import { Dashboardheader } from "../dashbord/dashboardheader/dashboardheader";

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [
    CommonModule, NgClass, NgIf, NgFor,
    FormsModule, Dashboardheader
  ],
  templateUrl: './equipment.html',
  styleUrl: './equipment.css'
})
export class EquipmentComponent {

  //  POPUP STATE (signal)
  showPopup = signal(false);
  editingItem = signal<Equipment | null>(null);

  //  FORM MODEL (signal)
  newEquipment = signal<Equipment>({
    id: '',
    name: '',
    zone: '',
    status: 'FREE',
    duration: 0,
    freeIn: ''
  });

  //  MASTER DATA (signal)
  equipment = signal<Equipment[]>(EQUIPMENT_LIST);

  //  FILTER TAB (signal)
  activeTab = signal('All');

  tabs = ["All", "Cardio", "Strength", "Functional"];

  //  FILTERED LIST (computed)
  filteredEquipment = computed(() => {

    if (this.activeTab() === 'All')
      return this.equipment();

    return this.equipment().filter(
      e => e.zone.toLowerCase()
        .includes(this.activeTab().toLowerCase())
    );
  });

  //  LIVE STATS (computed)
  status = computed(() => {
    const list = this.equipment();

    const total = list.length;
    const inUse = list.filter(e => e.status === 'IN_USE').length;
    const maintenance = list.filter(e => e.status === 'MAINTENANCE').length;

    return {
      totalAssets: total,
      utilization: Math.round((inUse / total) * 100),
      maintenance,
      buySuggestion: inUse / total > 0.8 ? "High" : "Normal"
    };
  });
popularity: any;

  //  TAB FILTER
  filterByTab(tab: string) {
    this.activeTab.set(tab);
  }

  //  STATUS BADGE (same logic — kept)
  getStatusLabel(s: string) {
    switch (s) {
      case 'IN_USE': return "In Use";
      case 'FREE': return "Free";
      case 'MAINTENANCE': return "Maintenance";
      default: return s;
    }
  }

  getStatusClass(s: string) {
    return {
      red: s === 'IN_USE',
      green: s === 'FREE',
      yellow: s === 'MAINTENANCE'
    };
  }

  //  OPEN ADD
  openAdd() {
    this.editingItem.set(null);
    this.newEquipment.set({
      id: '',
      name: '',
      zone: '',
      status: 'FREE',
      duration: 0,
      freeIn: ''
    });

    this.showPopup.set(true);
  }

  //  OPEN EDIT
  openEdit(item: Equipment) {
    this.editingItem.set(item);
    this.newEquipment.set({ ...item });
    this.showPopup.set(true);
  }

  //  DELETE
  delete(item: Equipment) {
    this.equipment.update(list =>
      list.filter(e => e !== item)
    );
  }

  //  SAVE (ADD / UPDATE)
  saveEquipment() {

    const data = this.newEquipment();

    if (!data.name.trim()) return;

    // ADD
    if (!this.editingItem()) {

      const id = 'EQ-' + Math.floor(Math.random() * 999);

      this.equipment.update(list => [
        ...list,
        { ...data, id }
      ]);
    }

    // UPDATE
    else {

      this.equipment.update(list =>
        list.map(e =>
          e === this.editingItem()
            ? { ...data }
            : e
        )
      );
    }

    this.showPopup.set(false);
  }

  //  INIT
  ngOnInit() {}
}
