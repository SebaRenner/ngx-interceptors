import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private _cache: Map<string, HttpResponse<unknown>> = new Map<string, HttpResponse<unknown>>();

  get size(): number {
    return this._cache.size;
  }

  add(url: string, response: HttpResponse<unknown>) {
    this._cache.set(url, response);
  }

  get(url: string): HttpResponse<unknown> | undefined {
    return this._cache.get(url);
  }

  clear() {
    this._cache.clear();
  }
}
