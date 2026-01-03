import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Dashbord } from './Pages/dashbord/dashbord';
import { Reports } from './Pages/reports/reports';
import { EquipmentComponent } from './Pages/equipment/equipment';
import { Satff } from './Pages/satff/satff';
import { Members } from './Pages/members/members';
import { Editmemberprofile } from './Pages/members/editmemberprofile/editmemberprofile';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Dashbord,Reports,EquipmentComponent,Satff,Members,RouterLink,Editmemberprofile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DashboardPortal');
}
