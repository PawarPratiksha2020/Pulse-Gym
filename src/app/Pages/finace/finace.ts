import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexTooltip, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  colors: string[];
};
@Component({
  selector: 'app-finace',
  imports: [DatePipe, AsyncPipe,CommonModule, ChartComponent, NgApexchartsModule],
  templateUrl: './finace.html',
  styleUrls: [ './finace.css'],
})
export class Finace {
  myDate = new Date();
  name = 'Q4  Projection'

chart :any= {
  series: [
    { name: 'Revenue', data: [48,55,62,70,78,84,90] }
  ],
  chart: {            // ← must exist
    type: 'line',
    height: 230,
    toolbar: { show: false }
  },
  stroke: {           // ← must exist
    curve: 'smooth',
    width: 3,
    dashArray: [0, 6]
  },
  xaxis: { categories: ['May','Jun','Jul','Aug','Sep','Oct','Nov'] },
  colors: ['#38bdf8'],
  tooltip: { theme: 'dark' }
};

}
