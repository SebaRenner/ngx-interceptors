import { TestBed } from '@angular/core/testing';

import { NgxInterceptorsService } from './ngx-interceptors.service';

describe('NgxInterceptorsService', () => {
  let service: NgxInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
