import { Injectable } from "@angular/core";
import { HttpHeader } from "../header.config";

@Injectable({
  providedIn: 'root'
})
export class DynamicHeaderService {
  private _dynamicHeaders: HttpHeader = {};

  addHeader(name: string, value: string | string[]) {
    this._dynamicHeaders[name] = value;
  }

  setHeader(header: HttpHeader) {
    this._dynamicHeaders = header;
  }

  getHeaders(): HttpHeader {
    return this._dynamicHeaders;
  }

  clearHeader() {
    this._dynamicHeaders = {};
  }
}
