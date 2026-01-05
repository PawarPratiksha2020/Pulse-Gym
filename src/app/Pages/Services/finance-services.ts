import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinanceServices {
   private billingSource = new BehaviorSubject<any[]>([
    { id:'#INV-2042', member:'Sarah Connor', method:'Card', date:'Oct 20', amount:89, status:'Paid', branch:'Pune', plan:'Premium'},
    { id:'#INV-1844', member:'James Lee', method:'UPI',  date:'Oct 19', amount:49, status:'Failed', branch:'Mumbai', plan:'Standard'},
    { id:'#INV-1772', member:'Riya Patel', method:'Cash', date:'Oct 18', amount:29, status:'Refunded', branch:'Pune', plan:'Student'}
  ]);

  billing$ = this.billingSource.asObservable();

  updateBilling(list:any[]){
    this.billingSource.next(list);
  }
  
}
