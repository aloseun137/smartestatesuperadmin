import { TestBed } from '@angular/core/testing';

import { BootstrapNotifyService } from './bootstrap-notify.service';

describe('BootstrapNotifyService', () => {
  let service: BootstrapNotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BootstrapNotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
