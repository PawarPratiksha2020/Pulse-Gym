import { TestBed } from '@angular/core/testing';

import { Staffattendence } from './staffattendence';

describe('Staffattendence', () => {
  let service: Staffattendence;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Staffattendence);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
