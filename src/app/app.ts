import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Dashbord } from './Pages/dashbord/dashbord';
import { Reports } from './Pages/reports/reports';
import { Equipment } from './Pages/equipment/equipment';
import { Satff } from './Pages/satff/satff';
import { Members } from './Pages/members/members';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Dashbord,Reports,Equipment,Satff,Members,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DashboardPortal');
}
