import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPrecheckComponent } from './guest-precheck.component';

describe('GuestPrecheckComponent', () => {
  let component: GuestPrecheckComponent;
  let fixture: ComponentFixture<GuestPrecheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPrecheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPrecheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
