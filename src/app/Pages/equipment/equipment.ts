import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { EQUIPMENT_LIST } from '../mock/equipment.mock';
import { Equipment } from '../Model/equipment.model';


@Component({
  selector: 'app-equipment',
  imports: [NgClass,NgFor,],
  templateUrl: './equipment.html',
  styleUrl: './equipment.css',
})
export class EquipmentComponent {
  // Top Stats
  status = {
    totalAssets: 142,
    utilization: 78,
    maintenance: 4,
    buySuggestion: "High"
  };

  // ------ Table Data ------
  equipment: Equipment[] = EQUIPMENT_LIST;

  // ------ Tabs ------
  activeTab: string = "All";

  tabs = ["All", "Cardio", "Strength", "Functional"];
equipmentss: any;
  zone: any;

  filterByTab(tab: string) {
    this.activeTab = tab;

    if (tab === "All") {
      this.equipment = EQUIPMENT_LIST;
      return;
    }

    this.equipment = EQUIPMENT_LIST.filter(item =>
      item.zone.toLowerCase().includes(tab.toLowerCase())
    );
  }

  // ------ Badge Text ------
  getStatusLabel(status: string) {
    switch (status) {
      case 'IN_USE': return "In Use";
      case 'FREE': return "Free";
      case 'MAINTENANCE': return "Maintenance";
      default: return status;
    }
  }

  // ------ Badge Color ------
  getStatusClass(status: string) {
    return {
      'red': status === 'IN_USE',
      'green': status === 'FREE',
      'yellow': status === 'MAINTENANCE'
    };
  }

  // ------ Popularity Data ------
  popularity = [
    { name: "Treadmills", value: 92 },
    { name: "Free Weights", value: 85 },
    { name: "Cable Machines", value: 68 },
    { name: "Rowers", value: 45 }
  ];

}
