import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { UserServices, } from '../Services/user-services';
import { HttpClient } from '@angular/common/http';
import { ColDef, colorSchemeDark, GridApi, GridReadyEvent, themeQuartz, } from 'ag-grid-community';

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [AgGridAngular,],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private gridApi!:GridApi<any>
  UserList = signal<any[]>([]);
 public rowSelection :'single'|'multiple'='multiple';
  colDefs1: ColDef[] = [
   
    { field: "id", headerName: 'User-Id' , checkboxSelection:true, headerCheckboxSelection:true,
    cellRenderer:(item:any)=>{
        return "Emp -"+item.value
      }
    },
    { field: "name", headerName: 'Name',filter: 'agTextColumnFilter'},
    { field: "username", headerName: 'UserName' },
    { field: "email", headerName: 'E-mail',editable:true,
      wrapText: true,
  autoHeight: true,
  cellStyle: { lineHeight: '1.4'}
     },
    {headerName:'Street', valueGetter:p=>p.data.address?.street ,wrapText: true,
  autoHeight: true},
    {headerName:"city",valueGetter:p=>p.data.address?.city,wrapText: true,
  autoHeight: true},
    { headerName: "Zip", valueGetter: p => p.data.address?.zipcode ,wrapText: true,
  autoHeight: true}


  ];
  defaultColDef1 = {
    flex: 1,
    minWidth: 120,
    sortable:true,
    filter:true,
    resizable:true,
    wraptext:true,
    autoHight:true
  }
  rowHeight = 42;
  headerHieght=44;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getUser();
  }
  OnBtExport(){
   this.gridApi.exportDataAsCsv();
  }
  onGridReady(event:GridReadyEvent<any>){
     this.gridApi = event.api
  }
  getUser() {
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any) => {
      this.UserList = res;
    })
  }
 
}


