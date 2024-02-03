import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInterceptorsComponent } from './ngx-interceptors.component';

describe('NgxInterceptorsComponent', () => {
  let component: NgxInterceptorsComponent;
  let fixture: ComponentFixture<NgxInterceptorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxInterceptorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxInterceptorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
