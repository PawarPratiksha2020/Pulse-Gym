import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EQUIPMENT_LIST } from '../mock/equipment.mock';
import { Equipment } from '../Model/equipment.model';
import { Dashboardheader } from "../dashbord/dashboardheader/dashboardheader";
import { BehaviorSubject, single } from 'rxjs';
import { AgGridAngular } from "ag-grid-angular";
import { ColDef } from 'ag-grid-community';
import { EquipmentService } from '../Services/equipment-service';
import { MatDialog } from '@angular/material/dialog';
import { AddEquipmentDialog } from './add-equipment-dialog/add-equipment-dialog';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [
    CommonModule, NgClass, NgIf, NgFor,
    FormsModule, Dashboardheader,
    AgGridAngular
],
  templateUrl: './equipment.html',
  styleUrl: './equipment.css'
})
export class EquipmentComponent implements OnInit{
[x: string]: any;
  rowData = signal<Equipment[]>([]);
 
   context={
    componentParent:this
   }


  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: 'Equipment Name', flex: 1 },
    { field: 'zone', headerName: 'Zone' },
    { field: 'status', headerName: 'Status',
      cellStyle:{
      display:'flex',
      alignItem:'center',
      justifyContent:'center'
      },
       cellRenderer: (params: any) => {
    const s = params.value;

    const color =
      s === 'IN_USE' ? '#ef4444' :
      s === 'FREE' ? '#22c55e' :
      '#facc15';

    return `<span style="
      font-weight:600;
      padding:4px 10px;
      border-radius:14px;
      background:${color}20;
      color:${color};
    ">
      ${s.replace('-','')}
    </span>`;
     }
    },
    { field: 'duration', headerName: 'Avg Duration' ,
      width:180, valueFormatter:p=>p.value===0||p.value?p.value:'-'
    },
    { field: 'freeIn', headerName: 'Free In',width:180,valueFormatter :p => p.value ? p.value:'-' },
     {
    headerName: 'Action',
    pinned: 'right',
    minWidth: 160,
    cellRenderer: () => `
      <button class="grid-btn edit">Edit</button>
      <button class="grid-btn delete">Delete</button>
    `,
     onCellClicked: (params: any) => {
    const target = params.event.target as HTMLElement;

    if (target.classList.contains('edit')) {
      params.context.componentParent.onEdit(params.data);
    }

    if (target.classList.contains('delete')) {
      params.context.componentParent.onDelete(params.data);
    }
  }
  },
  
  ];
  defaultColDef = {
  flex: 1,
  minWidth: 130,
  resizable: true,
  sortable: true
};
  rowHeight =44;
  headerHeight =46;

  /* =======================
     OTHER PAGE DATA
  ======================= */
  popularity = [
    { name: 'Treadmill', value: 92 },
    { name: 'Cycle', value: 68 },
    { name: 'Cross Trainer', value: 55 }
  ];

  constructor(
    private equipmentService: EquipmentService,
    private dialog: MatDialog
  ) {}
 status = computed(() => {
    const list = this.rowData();

    const total = list.length;
    const inUse = list.filter(e => e.status === 'IN_USE').length;
    const maintenance = list.filter(e => e.status === 'MAINTENANCE').length;

    return {
      totalAssets: total,
      utilization: total ? Math.round((inUse / total) * 100) : 0,
      maintenance,
      buySuggestion: inUse / total > 0.8 ? 'High' : 'Normal'
    };
  });
  /* =======================
     INIT
  ======================= */
  ngOnInit(): void {

    // initial mock data service मध्ये टाक
    this.equipmentService.setInitial(EQUIPMENT_LIST);

    // 🔥 OBSERVABLE → GRID AUTO UPDATE
    this.equipmentService.equipment$.subscribe(data => {
      this.rowData.set(data)
    });
  }

  /* =======================
     OPEN ADD DIALOG
  ======================= */
  openAdd(): void {
    const dialogRef = this.dialog.open(AddEquipmentDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: Equipment | undefined) => {
      if (result) {
        this.equipmentService.add(result); // 🔥 observable update
      }
    });
  }

  /* =======================
     DELETE
  ======================= */
  delete(item: Equipment): void {
    this.equipmentService.delete(item.id);
  }

  /* =======================
     STATUS UI HELPERS
  ======================= */
  getStatusLabel(status: string): string {
    switch (status) {
      case 'IN_USE': return 'In Use';
      case 'FREE': return 'Free';
      case 'MAINTENANCE': return 'Maintenance';
      default: return status;
    }
  }

  getStatusClass(status: string) {
    return {
      red: status === 'IN_USE',
      green: status === 'FREE',
      yellow: status === 'MAINTENANCE'
    };
  }
  onEdit(row: Equipment) {
  console.log('EDIT', row);
  // 👉 dialog open कर
  this.openAdd();
}

onDelete(row: Equipment) {
  console.log('DELETE', row);
  this.equipmentService.delete(row.id);
}

}
