import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CachingService } from './caching.service';
import { HttpResponse } from '@angular/common/http';
import { CACHING_INTERCEPTOR_CONFIG, CacheEvictionPolicy } from '../caching.config';

describe('CachingService', () => {
  let service: CachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CachingService]
    });
  });

  it('should add response to cache', () => {
    // arrange
    const url = 'https://example.com/';
    const response = new HttpResponse({ status: 200, statusText: 'Ok' });

    service = TestBed.inject(CachingService);

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

    service = TestBed.inject(CachingService);

    service.add(url, response);

    // act
    service.clear();

    // assert
    expect(service.get(url)).toBe(undefined);
    expect(service.size).toBe(0);
  });

  it('should throw an error if max size is less than 0', () => {
    // arrange
    TestBed.overrideProvider(CACHING_INTERCEPTOR_CONFIG, { useValue: { maxSize: -1 } });

    // act & assert
    expect(() => {
      service = TestBed.inject(CachingService);
    }).toThrowError('Sub zero max cache size is not allowed');
  });

  it('should throw an error if max size is exceeded when using no evication policy', () => {
    // arrange
    TestBed.overrideProvider(CACHING_INTERCEPTOR_CONFIG, { useValue: { maxSize: 3, evictionPolicy: CacheEvictionPolicy.None } });
    service = TestBed.inject(CachingService);

    const response = new HttpResponse({ status: 200, statusText: 'Ok' });

    service.add('url1', response)
    service.add('url2', response)
    service.add('url3', response)

    // act & assert
    expect(() => {
      service.add('url4', response)
    }).toThrowError('Cache of CachingInterceptor is full. You can manually clear it or use an eviction policy');
  });

  it('should remove the first entry when FIFO eviction policy is used', () => {
    // arrange
    TestBed.overrideProvider(CACHING_INTERCEPTOR_CONFIG, { useValue: { maxSize: 3, evictionPolicy: CacheEvictionPolicy.FIFO } });
    service = TestBed.inject(CachingService);

    const response = new HttpResponse({ status: 200, statusText: 'Ok' });

    service.add('url1', response)
    service.add('url2', response)
    service.add('url3', response)

    // act
    service.add('url4', response)

    // assert
    expect(service.size).toBe(3);
    expect(service.get('url1')).toBeUndefined();
    expect(service.get('url4')).toBeDefined();
  });

  it('should remove the least recently used entry when LRU eviction policy is used', fakeAsync(() => {
    // arrange
    TestBed.overrideProvider(CACHING_INTERCEPTOR_CONFIG, { useValue: { maxSize: 3, evictionPolicy: CacheEvictionPolicy.LRU } });
    service = TestBed.inject(CachingService);

    const response = new HttpResponse({ status: 200, statusText: 'Ok' });

    service.add('url1', response)
    tick(1);
    service.add('url2', response)
    tick(1);
    service.add('url3', response)
    tick(1);

    service.get('url1');
    tick(1);
    service.get('url2');
    tick(1);

    // act
    service.add('url4', response)

    // assert
    expect(service.size).toBe(3);
    expect(service.get('url3')).toBeUndefined();
    expect(service.get('url4')).toBeDefined();
  }));

  it('should remove the least frequently used entry when LFU eviction policy is used', () => {
    // arrange
    TestBed.overrideProvider(CACHING_INTERCEPTOR_CONFIG, { useValue: { maxSize: 3, evictionPolicy: CacheEvictionPolicy.LFU } });
    service = TestBed.inject(CachingService);

    const response = new HttpResponse({ status: 200, statusText: 'Ok' });

    service.add('url1', response)
    service.add('url2', response)
    service.add('url3', response)

    service.get('url1');
    service.get('url2');

    // act
    service.add('url4', response)

    // assert
    expect(service.size).toBe(3);
    expect(service.get('url3')).toBeUndefined();
    expect(service.get('url4')).toBeDefined();
  });
});
