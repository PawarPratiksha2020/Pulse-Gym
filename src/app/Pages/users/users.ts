import { Component, inject, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { UserServices, } from '../Services/user-services';
import { HttpClient } from '@angular/common/http';
import { ColDef, colorSchemeDark, GridApi, GridReadyEvent, themeQuartz } from 'ag-grid-community';

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [AgGridAngular,],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private gridApi!:GridApi<any>
  UserList: any[] = [];
 public rowSelection :'single'|'multiple'='multiple';
  colDefs: ColDef[] = [
    { field: "id", headerName: 'User-Id' , checkboxSelection:true, headerCheckboxSelection:true,
    cellRenderer:(item:any)=>{
        return "Emp -"+item.value
      }
    },
    { field: "name", headerName: 'Name',filter: 'agTextColumnFilter'},
    { field: "username", headerName: 'UserName' },
    { field: "email", headerName: 'E-mail',editable:true },
    {headerName:'Street', valueGetter:p=>p.data.address?.street},
    {headerName:"city",valueGetter:p=>p.data.address?.city},
    { headerName: "Zip", valueGetter: p => p.data.address?.zipcode }


  ];
  defaultColDef = {
    flex: 1,
    minWidith: 100
  }
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
