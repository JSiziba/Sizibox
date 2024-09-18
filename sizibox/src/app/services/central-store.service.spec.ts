import { TestBed } from '@angular/core/testing';

import { CentralStoreService } from './central-store.service';

describe('CentralStoreService', () => {
  let service: CentralStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
