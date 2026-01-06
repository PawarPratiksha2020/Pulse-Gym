import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billingFilter' ,standalone:true
})
export class BillingFilterPipe implements PipeTransform {

 transform(list:any[], filters:any){
    return list.filter(row => {
      return (filters.branch === 'all' || row.branch === filters.branch) &&
             (filters.plan === 'all'   || row.plan === filters.plan);
    });
  }

}
