import { TestBed } from '@angular/core/testing';

import { MembersServices } from './members-services';

describe('MembersServices', () => {
  let service: MembersServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
