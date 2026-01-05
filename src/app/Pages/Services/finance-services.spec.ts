import { TestBed } from '@angular/core/testing';

import { FinanceServices } from './finance-services';

describe('FinanceServices', () => {
  let service: FinanceServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
