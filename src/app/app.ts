import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Dashbord } from './Pages/dashbord/dashbord';
import { Reports } from './Pages/reports/reports';
import { EquipmentComponent } from './Pages/equipment/equipment';
import { Satff } from './Pages/satff/satff';
import { Members } from './Pages/members/members';

import { Users } from './Pages/users/users';
import { Dashboardheader } from "./Pages/dashbord/dashboardheader/dashboardheader";
import { Grid } from './Pages/grid/grid';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashbord, Reports, EquipmentComponent, Satff, Members, RouterLink, Users, Dashboardheader,Grid],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DashboardPortal');

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

closeSidebar(){
  this.isSidebarOpen=false
}

}
