import { DynamicHeaderService } from "./dynamic-header.service";
import { TestBed } from '@angular/core/testing';
import { HttpHeader } from "../header.config";

describe('DynamicHeaderService', () => {
  let service: DynamicHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicHeaderService]
    });
    service = TestBed.inject(DynamicHeaderService);
  });

  it('should add header', () => {
    // arrange
    const name = 'Content-Type';
    const value = 'application/json'
    const headers: HttpHeader = { [name]: value }

    // act
    service.addHeader(name, value);

    // assert
    expect(service.getHeaders()).toEqual(headers);
  });

  it('should set headers', () => {
    // arrange
    const headers: HttpHeader = { 'Content-Type': 'application/json', 'x-token': '123' };

    // act
    service.setHeader(headers);

    // assert
    expect(service.getHeaders()).toEqual(headers);
  });

  it('should clear headers', () => {
    // arrange
    const headers: HttpHeader = { 'Content-Type': 'application/json', 'x-token': '123' };
    service.setHeader(headers);

    // act
    service.clearHeader();

    // assert
    expect(service.getHeaders()).toEqual({});
  });
});
