import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Dashbord } from './Pages/dashbord/dashbord';
import { Reports } from './Pages/reports/reports';
import { EquipmentComponent } from './Pages/equipment/equipment';
import { Satff } from './Pages/satff/satff';
import { Members } from './Pages/members/members';

import { Users } from './Pages/users/users';
import { Dashboardheader } from "./Pages/dashbord/dashboardheader/dashboardheader";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashbord, Reports, EquipmentComponent, Satff, Members, RouterLink, Users, Dashboardheader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DashboardPortal');
}
