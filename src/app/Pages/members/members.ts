import { NgIf, NgFor, NgClass, DatePipe, PercentPipe } from '@angular/common';
import { Component, AfterViewInit, OnDestroy, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { MembersServices } from '../Services/members-services';
import { Dashboardheader } from "../dashbord/dashboardheader/dashboardheader";
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, RouterLink, DatePipe, PercentPipe, Dashboardheader,HighchartsChartModule],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members implements AfterViewInit, OnDestroy {

  constructor(public store: MembersServices) {}
  attendence = 18;
currentStreak = 4;
progressGoal = 82;

  //  UI State (signals)
  editingMember = signal<any>(null);
  showToast = signal(false);

  //  Profile signals
  user = signal({
    name: 'Sarah Jenkins',
    email: 'sarah@mail.com',
    location:'Pune',
    BirthDate:'20 Jun 2021',
  });

  editUser = signal({ ...this.user() });

  enableEdit() {
    this.editUser.set({ ...this.user() });
    this.showToast.set(true);
  }

  saveProfile() {
    this.user.set({ ...this.editUser() });
    this.showToast.set(false);
   
  }

  cancelEdit() {
    this.showToast.set(false)
  }

  //  Membership data (signal)
  member = signal({
    planType: '',
    startDate: '',
    endDate: '',
    paymentStatus: 'Paid',
    renewalReminder: false,
    statusBadge: '',
    price: 0,
    trainerName: '',
    height: 0,
    weight: 0,
    bmi: 0,
    Medical:'',
    DietPreference: ''
  });

  // Plans list
  plans = [
    { name: "Basic-1 Month",  price: 800 , months:1 },
    { name: "Basic-3 Months", price: 2000 , months:3 },
    { name: "Basic-6 Months", price: 3500, months:6 },
    { name: "Basic-12 Months", price: 6000 , months:12 },
    { name: "Premium-1 Month", price: 1200, months:1 },
    { name: "Premium-12 Months", price: 9000 , months:12 }
  ];
  trainers = [
  { name: 'John David', capacity: 5, assigned: 3 },
  { name: 'Amit Sharma', capacity: 4, assigned: 4 },
  { name: 'Priya Patil', capacity: 6, assigned: 2 }
];

savedMember: any = null;
trainerHistory: any[] = [];

  //  Derived signal (BMI auto calc)
  bmi = computed(() => {
    const m = this.member();
    const h = m.height / 100;
    return h ? +(m.weight / (h*h)).toFixed(2) : 0;
  });

  onPlanChange() {
    const p = this.plans.find(x => x.name === this.member().planType);
    this.member.update(m => ({ ...m, price: p ? p.price : 0 }));
    this.setEndDate();
  }

  setEndDate() {
    const m = this.member();
    const plan = this.plans.find(p => p.name === m.planType);
    if (!plan || !m.startDate) return;

    const start = new Date(m.startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + plan.months);

    this.member.update(v => ({ ...v, endDate: end.toISOString().slice(0,10) }));
  }

  //  Attendance chart (reads observable if needed later)
  attendanceChart!: Chart;

  ngAfterViewInit() {
    this.attendanceChart = new Chart('attendanceChart', {
    type: 'bar',
    data:{
      labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets:[{ data:[2,4,5,3,6,4,2] }]
    },
    options:{ responsive:true, maintainAspectRatio:false }
  });
  }

  ngOnDestroy() {
    this.attendanceChart?.destroy();
  }
  recalculateBMI() {
  const m = this.member();
  const h = m.height / 100;
  const bmi = h ? +(m.weight / (h * h)).toFixed(2) : 0;

  this.member.update(v => ({ ...v, bmi }));
}
generateNewMember() {
  this.editingMember.set({
    id: '#'+ Math.floor(Math.random()*999),
    name: '',
    status: 'Active'
  });
}
get newMemberObj() {
  return {
    id:'#'+Math.floor(Math.random()*999),
    name:'',
    status:'Active'
  };
}
// editMember(m: any) {
//   this.editingMember.set({ ...m });
// }
getTrainerStatus(t: any){
  return t.assigned >= t.capacity ? 'Full' : 'Available';
}
assignTrainer() {
  const m = this.member();
  const t = this.trainers.find(x => x.name === m.trainerName);
  if (!t) return;

  if (t.assigned >= t.capacity) {
    alert("Trainer Full — Select another trainer");
    this.member.update(v => ({ ...v, trainerName: '' }));
    return;
  }

  t.assigned++;
}
changeTrainer() {

  if (this.savedMember && this.savedMember.trainerName !== this.member().trainerName) {
    this.trainerHistory.push({
      member: this.user().name,
      oldTrainer: this.savedMember.trainerName || 'None',
      newTrainer: this.member().trainerName || 'None',
      date: new Date().toLocaleString()
    });
  }
}
saveMembership() {

  const m = this.member();

  // Trainer change history (optional)
  if (this.savedMember && this.savedMember.trainerName !== m.trainerName) {
    this.trainerHistory.push({
      member: this.user().name,
      oldTrainer: this.savedMember.trainerName || 'None',
      newTrainer: m.trainerName || 'None',
      date: new Date().toLocaleString()
    });
  }

  // Auto-BMI refresh
  const h = m.height / 100;
  const bmi = h ? +(m.weight / (h*h)).toFixed(2) : 0;

  // Save Everything Together
  this.savedMember = {
    ...m,
    bmi
  };

  alert("All Details Saved Successfully");
}

// newMember() {
//   this.editingMember.set({
   
//     id: '#'+ Math.floor(Math.random()*999),
//     name: '',
//     status: 'Active',
//     isNew: true
//   });
// }

// saveMember() {

//   const member = this.editingMember();
//   if (!member) return;

//   // ADD NEW
//   if (member.isNew) {
//     this.store.add({ ...member, isNew:false });
//   }

//   // UPDATE EXISTING
//   else {
//     this.store.update(member);
//   }

//   this.editingMember.set(null);
// }
// cancel() {
//   this.editingMember.set(null);
// }
 Highcharts = Highcharts;
 chartOptions: Highcharts.Options = {

    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 220,
      margin: [20, 10, 30, 30]
    },

    credits: { enabled: false },
    legend: { enabled: false },
    title: { text: '' },

    xAxis: {
      categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      lineColor: '#30405E',
      labels: { style: { color: '#BFD3FF' } }
    },

    yAxis: {
      title: { text: '' },
      gridLineColor: '#1E2A45',
      labels: { style: { color: '#7f92b8' } }
    },

    plotOptions: {
      column: {
        borderRadius: 10,
        borderWidth: 0,
        pointPadding: 0.25,
        groupPadding: 0.2
      }
    },

    series: [
      {
        type: 'column',
        name: 'Workouts',
        data: [3, 7, 1, 3, 5, 8, 2],
        color: '#3DA4FF'
      },
      {
        type :'column',
        data:[10,10,10,10,10,10,10],
        color:'#5a68b'
      }
    ]
  };
  editMember(m:any){
  this.editingMember.set({ ...m, isNew:false });
}

newMember(){
  this.editingMember.set({
    id:'#'+Math.floor(Math.random()*999),
    name:'',
    status:'Active',
    isNew:true
  });
}

saveMember(){
  const member = this.editingMember();
  console.log('Saved Data',member);
  if(!member) return;

  if(member.isNew){
    console.log("Add Mode")
    this.store.add({ ...member, isNew:false });
  } else {
    console.log("Edit Mode")
    this.store.update(member);
  }

  this.editingMember.set(null);
  console.log('savng',member);
}

cancel(){
  this.editingMember.set(null);
}
onNameChange(value: string) {
  this.editingMember.update(m => ({ ...m, name: value }));
}

onStatusChange(value: string) {
  this.editingMember.update(m => ({ ...m, status: value }));
}
onMemberClick(m:any){
  const em = this.editingMember();
  if(em?.isNew) return;   // Add मोड चालू असेल तर click ignore

  this.editingMember.set({ ...m, isNew:false });
}

}



