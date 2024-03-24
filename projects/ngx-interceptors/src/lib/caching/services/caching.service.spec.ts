import { TestBed } from '@angular/core/testing';
import { CachingService } from './caching.service';
import { HttpResponse } from '@angular/common/http';

describe('CachingService', () => {
  let service: CachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CachingService]
    });
    service = TestBed.inject(CachingService);
  });

  it('should add response to cache', () => {
    // arrange
    const url = 'https://example.com/';
    const response = new HttpResponse({ status: 200, statusText: 'Ok' });

    // act
    service.add(url, response);

    // assert
    expect(service.get(url)).toBe(response);
    expect(service.size).toBe(1);
  });

  it('should clear cache', () => {
    // arrange
    const url = 'https://example.com/';
    const response = new HttpResponse({ status: 200, statusText: 'Ok' });

    service.add(url, response);

    // act
    service.clear();

    // assert
    expect(service.get(url)).toBe(undefined);
    expect(service.size).toBe(0);
  });
});
