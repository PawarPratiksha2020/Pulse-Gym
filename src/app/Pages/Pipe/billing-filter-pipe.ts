import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billingFilter'
})
export class BillingFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
