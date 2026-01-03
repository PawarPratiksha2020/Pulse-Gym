import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { RouterLink } from "@angular/router";

interface Member {
  name: string;
  id: string;
  status: 'Active' | 'pending' | 'Expired'
}
@Component({
  selector: 'app-members',
  imports: [NgClass, NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members implements AfterViewInit, OnDestroy {
 profile : any =[];
 attendence=8;
 currentStreak=4;
 progressGoal=82;
  
  totalUsers = 1248;
  editingmember: any = '';
  members: Member[] = [
    { name: 'Sarah Jenkins', id: '#99-281', status: 'Active' },
    { name: 'Marcus Thorne', id: '#99-342', status: 'Active' },
    { name: 'James Doe', id: '#99-321', status: 'pending' },
    { name: 'Emily Watson', id: '#99-882', status: 'Expired' },
    { name: 'David Chen', id: '#99-555', status: 'Active' },
    { name: 'Anita Lin', id: '#99-623', status: 'Active' }
  ];
  editmember(id: string) {
    const m = this.members.find(x => x.id === id);
    if (m) {
      this.editingmember = { ...m };
    }
  }
  newMember() {
    this.editingmember = {
      id: '#' + Math.floor(Math.random() * 999),
      name: '',
      status: 'Active'
    };
    console.log('Members list =>', this.members);

  }

  saveMember() {
    const index = this.members.findIndex(m => m.id === this.editingmember.id);

    if (index > -1) {
      this.members[index] = this.editingmember; // UPDATE
    } else {
      this.members.push(this.editingmember);
      this.totalUsers++; 
      this.attendence++;
      this.currentStreak=0;
      this.progressGoal=50;  // ADD NEW
    }

    this.editingmember = null;

  }
  cancel() {
    this.editingmember = null;
  }
  ProfileEdit(){

  }

  attendanceChart!: Chart;

  ngAfterViewInit(): void {
    this.loadAttendanceChart();
  }
  loadAttendanceChart() {

    this.attendanceChart = new Chart('attendanceChart', {
      type: 'bar',

      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
    if (this.attendanceChart) {
      this.attendanceChart.destroy();
    }

  }

}
