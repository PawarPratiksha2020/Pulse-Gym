import { AsyncPipe, CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexTooltip, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
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
  imports: [DatePipe, AsyncPipe,NgIf,NgFor, CommonModule, ChartComponent, NgApexchartsModule, FormsModule],
  templateUrl: './finace.html',
  styleUrls: ['./finace.css'],
})
export class Finace {
  myDate = new Date();
  name = 'Q4  Projection'

  chart: any = {
    series: [
      { name: 'Revenue', data: [48, 55, 62, 70, 78, 84, 90] }
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
    xaxis: { categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'] },
    colors: ['#38bdf8'],
    tooltip: { theme: 'dark' }
  };
  filters = {
    dateRange: 'month',
    branch: 'all',
    plan: 'all'
  };
  billingHistory = [
    { id: '#INV-2042', member: 'Sarah Connor', method: 'Card', date: 'Oct 20', amount: 89, status: 'Paid',branch:'pune',plan:'premium' },
    { id: '#INV-1844', member: 'James Lee', method: 'UPI', date: 'Oct 19', amount: 49, status: 'Failed', branch:'Mumbai', plan:'Standard'},
    { id: '#INV-1772', member: 'Riya Patel', method: 'Cash', date: 'Oct 18', amount: 29, status: 'Refunded',branch:'Pune', plan:'Student' }
  ];

  filteredBilling = [...this.billingHistory];  // copy for filtering


  applyFilters() {
    console.log("Filters Applied", this.filters);
     this.filteredBilling = this.billingHistory.filter(row => {

    let match = true;

    // Branch filter example
    if(this.filters.branch !== 'all'){
      match = match && row.branch === this.filters.branch;
    }

    // Plan filter (optional if data has plan)
    if(this.filters.plan !== 'all'){
      match = match && row.plan === this.filters.plan;
    }

    return match;
  });

  }


}
