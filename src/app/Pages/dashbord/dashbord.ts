import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Dashboardheader } from "./dashboardheader/dashboardheader";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashbord',
  imports: [DatePipe, NgFor, Dashboardheader, FormsModule],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css',
})
export class Dashbord {

  CurrentDate = new Date();
  adminMode = false;     // ⭐ ADMIN ENABLE / DISABLE

  // 🔹 Dynamic Metrics
  occupancy = { used: 84, total: 120 };
  checkins = { value: 342, change: +15 };
  revenue = { total: 42500, membership: 35000, pos: 7500, growth: 12 };

  // 🔹 Edit popup
  showEditPopup = false;

  hours = [
    { time: '06:00', avg: 25, live: 20 },
    { time: '08:00', avg: 45, live: 30 },
    { time: '10:00', avg: 45, live: 35 },
    { time: '12:00', avg: 50, live: 45 },
    { time: '14:00', avg: 55, live: 65 },
    { time: '16:00', avg: 70, live: 85 },
    { time: '18:00', avg: 90, live: 98 },
    { time: '20:00', avg: 65, live: 50 },
    { time: '22:00', avg: 40, live: 35 },
    { time: '22:00', avg: 50, live: 30 },
    { time: '22:00', avg: 30, live: 15 },
    { time: '22:00', avg: 30, live: 10 },
    { time: '22:00', avg: 20, live: 15 },
    { time: '22:00', avg: 30, live: 5 },
  ];

  // ⭐ Occupancy %
  get occupancyPercent() {
    return Math.round((this.occupancy.used / this.occupancy.total) * 100);
  }

  // ⭐ Auto Badge
  get occupancyLevel() {
    const p = this.occupancyPercent;
    if (p < 40) return 'LOW';
    if (p < 70) return 'MODERATE';
    return 'HIGH';
  }

  // ⭐ Open Edit Dialog
  openEdit() {
    this.showEditPopup = true;
    this.adminMode = true;
  }

  // ⭐ Save Changes
  saveMetrics() {
    this.showEditPopup = false;
  }
}
