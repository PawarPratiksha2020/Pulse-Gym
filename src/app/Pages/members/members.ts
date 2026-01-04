import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { RouterLink } from "@angular/router";

interface Member {
  
  name: string;
  id: string;
  status: 'Active' | 'pending' | 'Expired',
  isTrainer?: boolean;
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
  ngOnInit() {

  const saved = localStorage.getItem("selectedPlan");

  if(saved){
    const p = JSON.parse(saved);

    this.member.planType = p.planName;
    // this.member.price = p.price;
    this.member.startDate = p.startDate;

    this.setEndDate();

    localStorage.removeItem("selectedPlan");  // clear after load
  }
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

 editMode = false;
  showToast = false;

  user = {
    name: 'Sarah Jenkins',
    email: 'sarah@mail.com',
    location:'Pune',
    BirthDate:'20 Jun 2021',

  };

  editUser: any = {};

  enableEdit() {
    this.editMode = true;
    this.editUser = { ...this.user }; // copy data
  }

  saveProfile() {
    this.user = { ...this.editUser };
    this.editMode = false;

    this.showToast = true;
    setTimeout(() => this.showToast = false, 2000);
  }

  cancelEdit() {
    this.editMode = false;
  }
  member = {
  planType: '',
  startDate: '',
  endDate: '',
  paymentStatus: 'Paid',
  renewalReminder: false,
  statusBadge: '',

  trainerName: '',

  height: 0,
  weight: 0,
  bmi: 0,
  bodyFat: 0,

  medicalConditions: '',
  injuries: '',
  dietPreference: 'Veg'
};

calculateBMI(){
  const h = this.member.height / 100;
  this.member.bmi = +(this.member.weight / (h*h)).toFixed(2);
}

changeTrainer(name:string){
  this.member.trainerName = name;
}
savedMember: any = null;

plans: any = {
  "Basic-1 Month": 1,
  "Basic-3 Months": 3,
  "Basic-6 Months": 6,
  "Basic-12 Months": 12,
  "Premium-1 Month": 1,
  "Premium-12 Months": 12
};



//  Auto End Date Function
setEndDate() {

  if (!this.member.startDate || !this.member.planType) return;

  const months = this.plans[this.member.planType]; 
  if(!months) return ;  // plan → months
  const start = new Date(this.member.startDate);

  const end = new Date(start);
  end.setMonth(end.getMonth() + months);

  this.member.endDate = end.toISOString().substring(0,10);
}
trainerHistory:any[]=[];
saveMembership() {
  if (this.savedMember && this.savedMember.trainerName !== this.member.trainerName) {
    this.trainerHistory.push({
      member: this.user.name,
      oldTrainer: this.savedMember.trainerName || 'None',
      newTrainer: this.member.trainerName || 'None',
      date: new Date().toLocaleString()
    });
  }

  this.savedMember = { ...this.member };
  this.updateExpiryBadge();
}

// 👉 DAYS REMAINING + BADGE LOGIC
updateExpiryBadge() {

  if (!this.member.endDate) return;

  const today = new Date();
  const end = new Date(this.member.endDate);
  const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 3600 * 24));

  if (diff < 0) {
    this.member.statusBadge = 'Expired';
  } 
  else if (diff <= 7) {
    this.member.statusBadge = `Expires in ${diff} days`;
  } 
  else {
    this.member.statusBadge = `Active — ${diff} days left`;
  }

}
trainers = [
  { name: 'John David', capacity: 5, assigned: 3 },
  { name: 'Amit Sharma', capacity: 4, assigned: 4 },
  { name: 'Priya Patil', capacity: 6, assigned: 2 }
];

getTrainerStatus(t: any){
  return t.assigned >= t.capacity ? 'Full' : 'Available';
}
assignTrainer(){
   const trainer = this.trainers.find(t => t.name === this.member.trainerName);
  if (!trainer) return;

  if (trainer.assigned >= trainer.capacity) {
    alert("Trainer Full — Select another trainer");
    this.member.trainerName = '';
    return;
  }

  trainer.assigned++; 
}
getTrainers(){
  return this.members.filter(m => m.isTrainer && m.status === 'Active');
}


}
