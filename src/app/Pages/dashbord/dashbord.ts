import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  imports: [DatePipe, NgFor],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css',
})
export class Dashbord {
  CurrentDate = new Date();
  text: string = 'System Live'
  hours = [
    { time: '06:00', avg: 25, live: 20 },
    { time: '08:00', avg: 45, live: 30},
    { time: '10:00', avg: 45, live: 35},
    { time: '12:00', avg: 50, live: 45 },
    { time: '14:00', avg: 55, live: 65 },
    { time: '16:00', avg: 70, live: 85 },
    { time: '18:00', avg: 90, live: 98 },
    { time: '20:00', avg: 65, live: 50 },
    { time: '24:00', avg: 60, live: 55 },
    { time: '18:00', avg: 43, live: 40 },
    { time: '10:00', avg: 70, live: 65 },
    { time: '5:00', avg: 20, live: 15},
     { time: '5:00', avg: 30, live: 0 },
      { time: '5:00', avg: 20, live: 0 },
       { time: '5:00', avg: 10, live: 0 },
  ];


}
