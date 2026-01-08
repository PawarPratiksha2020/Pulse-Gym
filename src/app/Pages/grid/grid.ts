import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { filter } from 'rxjs';

@Component({
  selector: 'app-grid',
  imports: [AgGridAngular],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
})
export class Grid implements OnInit {
  dataList: any[] = [];
   public rowSelection1 :'single'|'multiple'='multiple';
  columnDefs: ColDef[] = [
    
    { field: 'id', headerName: 'User_id', headerClass: 'grid-header',
      checkboxSelection:true,headerCheckboxSelection:true,
      cellRenderer:(item:any)=>{
        return "Id-"+item.value
      }
    },
    { field: 'name', headerName: 'UserName', headerClass: 'grid-header' },
    { field: 'email', headerName: 'Email', headerClass: 'grid-header', 
      wrapText:true,autoHeight:true,cellClass:'emal-cell',tooltipField:'email'
    },
    {
      field: 'status', headerName: 'Status', headerClass: 'grid-header',
      cellClassRules: {
        'status-active': (params) => params.value === 'Active',
        'status-pending': (params) => params.value === 'Pending',
        'status-expired': (params) => params.value === 'Expired'
      },
       
    },
    { field: 'role', headerName: 'Role', headerClass: 'grid-header', 
     
     },
    { field: 'joinDate', headerName: 'Joining Date', headerClass: 'grid-header' }
  ];
  defaultColDef = {
    flex: 1,
    minWidth: 120,
    filter:true,
    cellStyle:{
      textAlign:'center'
    },
    sortable: true,
    resizable: true
  }
  
  headerHeight = 45;
  //  rowSelection: RowSelectionOptions | "single" | "multiple" = {
  //   mode: "multiRow",};
  ngOnInit(): void {
    this.getDataUser();
  }

  constructor(private http: HttpClient) { }
  getDataUser() {
    this.http.get<any[]>("assets/data/members.json").subscribe((result) => {
      this.dataList = result;
      console.log("Total Records", result.length)
    })
  }
}
