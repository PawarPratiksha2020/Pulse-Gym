export interface Attendance {
  staffId: number;
  date: string;

  shiftStart: string;   // 09:00
  shiftEnd: string;     // 06:00 PM

  checkIn?: string;
  checkOut?: string;

  totalHours?: number;
  status?: 'Present' | 'Late' | 'Absent';
  overtime?: number;
}
