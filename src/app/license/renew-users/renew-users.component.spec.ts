import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewUsersComponent } from './renew-users.component';

describe('RenewUsersComponent', () => {
  let component: RenewUsersComponent;
  let fixture: ComponentFixture<RenewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
