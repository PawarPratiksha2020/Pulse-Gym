import { AsyncPipe, CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexTooltip, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { Dashboardheader } from "../dashbord/dashboardheader/dashboardheader";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-finace',
  imports: [DatePipe, AsyncPipe, NgIf, NgFor, CommonModule, ChartComponent, NgApexchartsModule, FormsModule, Dashboardheader, MatSelectModule, MatFormFieldModule,
    MatProgressBarModule],
  templateUrl: './finace.html',
  styleUrls: ['./finace.css'],
})
export class Finace {
  myDate = new Date();
  name = signal<string>("'Q4  Projection'");
  revenue = signal<string>('$84,320');
  target = signal<number>(120);

  // planValue = (this.revenue() / this.target()) * 100;
  planValue = signal<number>( (this.revenue().replace('$','') as unknown as number / this.target()) * 100 );
  Range=[
     {value: 'month', viewValue: 'This Month'},
    {value: 'Quarter', viewValue: 'This Quarter'},
    {value: 'Year', viewValue: 'This Year'}
  ];
  selectedRange = 'month';

  chart: any = {
    series: [
      { name: 'Revenue', data: [48, 55, 62, 70, 78, 84, 90] }
    ],
    chart: {        
      type: 'line',
      height: 230,
      toolbar: { show: false }
    },
    stroke: {          
      curve: 'smooth',
      width: 3,
      dashArray: [0, 6]
    },
    xaxis: { categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'] },
    colors: ['#38bdf8'],
    tooltip: { theme: 'dark' }
  };
 
  billingHistory = [
    { id: '#INV-2042', member: 'Sarah Connor', method: 'Card', date: 'Oct 20', amount: 89, status: 'Paid', branch: 'pune', plan: 'premium' },
    { id: '#INV-1844', member: 'James Lee', method: 'UPI', date: 'Oct 19', amount: 49, status: 'Failed', branch: 'Mumbai', plan: 'Standard' },
    { id: '#INV-1772', member: 'Riya Patel', method: 'Cash', date: 'Oct 18', amount: 29, status: 'Refunded', branch: 'Pune', plan: 'Student' }
  ];

  filteredBilling = [...this.billingHistory];  // copy for filtering

 



  }



