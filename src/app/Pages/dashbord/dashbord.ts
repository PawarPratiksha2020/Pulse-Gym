import { DatePipe, NgFor, PercentPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Dashboardheader } from "./dashboardheader/dashboardheader";
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { BehaviorSubject } from 'rxjs';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-dashbord',
  standalone:true,
  imports: [DatePipe, NgFor, Dashboardheader, FormsModule, PercentPipe,HighchartsChartModule ],
  templateUrl: './dashbord.html',
  styleUrls: ['./dashbord.css'],
})
export class Dashbord {
  Highcharts =Highcharts ;

  chartOptions :Highcharts.Options ={
     chart: {
      type: 'column',
      backgroundColor: '#07102A',
      borderRadius: 18
    },

    xAxis: {
      categories: [
        '06:00','08:00','10:00','12:00','14:00','16:00','17:00','18:00','19:00',
        '20:00','21:00','22:00'
      ],
      lineColor: '#3c4d6b',
      labels: { style: { color: '#cfd7f2' } }
    },

    yAxis: {
      title: { text: '' },
      gridLineColor: '#1b2b45'
    },

    legend: {
      itemStyle: { color: '#cfd7f2' }
    },

    plotOptions: {
      column: {
        borderRadius: 12,
        pointPadding: 0.2,
        groupPadding: 0.25
      }
    },

    series: [
      {  
        type: 'column', 
        name:'Average(Typical)',
        data: [5,7,4,9,6,13,11,9,6,5,3],
      color: '#5A68B'
     },
     {
      type: 'column',
        name: 'Today (Live)',
        data: [4,6,3,8,5,9,12,10,8,5,4,2],
        color: '#2fb9ff'
     }
    ]
  };
   chartOptions1: Highcharts.Options = {

    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 80,
      margin: [5, 5, 15, 5]
    },

    title: { text: '' },
    credits: { enabled: false },
    legend: { enabled: false },

    xAxis: {
      visible: false
    },

    yAxis: {
      visible: false,
      min: 0
    },

    tooltip: { enabled: false },

    plotOptions: {
      column: {
        borderRadius: 6,
        borderWidth: 0,
        pointPadding: 0.10,
        groupPadding: 0.1
      },
      series: {
        animation: true
      }
    },

    series: [
      {
        type: 'column',
        data: [2, 4, 3, 6, 5, 4, 6,8,7,9],
        color: '#2FB9FF'
      }
    ]
  };
  
  CurrentDate = new Date();
  adminMode = false;  //  ADMIN ENABLE / DISABLE
   //  Edit popup
  showEditPopup = false;   

  // Dynamic Metrics
  occupancy = { used: 84, total: 120 };
  checkins = { value: 342, change: +15 };
  revenue = { total: 42500, membership: 35000, pos: 7500, growth: 12 };

 
//CROWD DATA (Signal + Observable)
//   hours = [
//     { time: '06:00', avg: 25, live: 20 },
//     { time: '08:00', avg: 45, live: 30 },
//     { time: '10:00', avg: 45, live: 35 },
//     { time: '12:00', avg: 50, live: 45 },
//     { time: '14:00', avg: 55, live: 65 },
//     { time: '16:00', avg: 70, live: 85 },
//     { time: '18:00', avg: 90, live: 98 },
//     { time: '20:00', avg: 65, live: 50 },
//     { time: '22:00', avg: 40, live: 35 },
//     { time: '22:00', avg: 50, live: 30 },
//     { time: '22:00', avg: 30, live: 15 },
//     { time: '22:00', avg: 30, live: 10 },
//     { time: '22:00', avg: 20, live: 15 },
//     { time: '22:00', avg: 30, live: 5 },
//   ];
//  // Signal
//  hoursSig = signal(this.hours);
 //computed Value
  // peakHour = computed(() =>
  //   this.hoursSig().reduce((p, c) => (c.live > p.live ? c : p))
  // );
  //   //  OBSERVABLE STATE
  // private _hours$ = new BehaviorSubject(this.hours);
  // hours$ = this._hours$.asObservable();

  //  Occupancy %
  get occupancyPercent() {
    return Math.round((this.occupancy.used / this.occupancy.total) * 100);
  }

  //  Auto Badge
  get occupancyLevel() {
    const p = this.occupancyPercent;
    if (p < 40) return 'LOW';
    if (p < 70) return 'MODERATE';
    return 'HIGH';
  }

  //  Open Edit Dialog
  openEdit() {
    this.showEditPopup = true;
    this.adminMode = true;
  }

  //  Save Changes
  // saveMetrics() {
  //    this._hours$.next(this.hours);
  //   this.hoursSig.set(this.hours);
   
  //   this.showEditPopup = false;
  // }
   //  HIGHCHARTS



  

  
}
