import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { EQUIPMENT_LIST } from '../mock/equipment.mock';
import { Equipment } from '../Model/equipment.model';
import { Dashboardheader } from "../dashbord/dashboardheader/dashboardheader";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-equipment',
  imports: [NgClass,NgIf, NgFor, Dashboardheader,FormsModule,CommonModule],
  templateUrl: './equipment.html',
  styleUrl: './equipment.css',
})
export class EquipmentComponent {
  // Top Stats
 showPopup = false;
editingItem: Equipment | null = null;

newEquipment: Equipment = {
  id: '',
  name: '',
  zone: '',
  status: 'FREE',
  duration: 0,
  freeIn: ''
};
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
  // ➕ Add Equipment
openAdd(){
  alert("open ADD Clicked")
  this.editingItem = null;
  this.newEquipment = { id:'', name:'', zone:'', status:'FREE', duration:0, freeIn:'' };
  this.showPopup = true;
  console.log("POPUP=",this.showPopup)
}

// ✏ Edit Equipment
openEdit(item: Equipment){
  this.editingItem = item;
  this.newEquipment = { ...item };
  this.showPopup = true;
}

// ❌ Delete
delete(item: Equipment){
  this.equipment = this.equipment.filter(e => e !== item);
  this.recalculateStats();
}

// 💾 Save (Add + Update)
saveEquipment(){
  
  if(!this.newEquipment.name.trim()) return;

  // ADD
  if(!this.editingItem){
    this.newEquipment.id = 'EQ-' + Math.floor(Math.random()*999);
    this.equipment.push({ ...this.newEquipment });
  }
  // UPDATE
  else{
    Object.assign(this.editingItem, this.newEquipment);
  }

  this.showPopup = false;
  this.recalculateStats();
}
recalculateStats(){

  this.status.totalAssets = this.equipment.length;

  const inUse = this.equipment.filter(e => e.status === 'IN_USE').length;
  this.status.utilization = Math.round((inUse / this.status.totalAssets) * 100);

  this.status.maintenance =
    this.equipment.filter(e => e.status === 'MAINTENANCE').length;

  this.status.buySuggestion =
    this.status.utilization > 80 ? "High" : "Normal";
}

ngOnInit(){
  this.recalculateStats();
}



}
