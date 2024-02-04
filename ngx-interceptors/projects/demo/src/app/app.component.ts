import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: ''
})
export class AppComponent {
  constructor(http: HttpClient) {
    http.get('http://google.ch').subscribe();
  }
}
