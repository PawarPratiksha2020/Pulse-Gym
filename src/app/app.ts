import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Layout } from 'layout';
import { ThemeService } from './Pages/Services/theme-service';
import { Dashboardheader } from "./Pages/dashbord/dashboardheader/dashboardheader";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Layout, Dashboardheader,RouterLink,],
templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App  {
   protected readonly title = signal('DashboardPortal');

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

closeSidebar(){
  this.isSidebarOpen=false
}
constructor(private themeServices:ThemeService){}
ngOnInit(): void {
  this.themeServices.loadTheme();
}

}
