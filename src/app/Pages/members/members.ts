import { NgClass, NgFor } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';

interface Member {
  name: string;
  id: string;
  status: 'Active' | 'pending' | 'Expired'
}
@Component({
  selector: 'app-members',
  imports: [NgClass,NgFor],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members  implements AfterViewInit,OnDestroy{
 
  members: Member[] = [
    { name: 'Sarah Jenkins', id: '#99-281', status: 'Active' },
    { name: 'Marcus Thorne', id: '#99-342', status: 'Active' },
    {name:'James Doe' , id:'#99-321', status: 'pending'},
    { name: 'Emily Watson', id: '#99-882', status: 'Expired' },
    { name: 'David Chen', id: '#99-555', status: 'Active' },
    { name: 'Anita Lin', id: '#99-623', status: 'Active' }
  ];

   attendanceChart! :Chart;

   ngAfterViewInit(): void {
      this.loadAttendanceChart();
   }
   loadAttendanceChart() {

    this.attendanceChart = new Chart('attendanceChart', {
      type: 'bar',

      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
          data: [2, 4, 5, 3, 6, 4, 2],
          backgroundColor: '#d5deecff',   // blue bars
          borderRadius: 10,             // rounded bars
          barThickness: 26
        }]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: { display: false }
        },

        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#a7b3ff' }
          },
          y: {
            grid: { color: '#111827' },
            ticks: { color: '#a7b3ff', stepSize: 1 }
          }
        }
      }
    });

  }
  ngOnDestroy(): void {
    if(this.attendanceChart){
      this.attendanceChart.destroy();
    }
     
   }

}
