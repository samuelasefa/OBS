import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBidChangeRequestsComponent } from './admin-bid-change-requests.component';

describe('AdminBidChangeRequestsComponent', () => {
  let component: AdminBidChangeRequestsComponent;
  let fixture: ComponentFixture<AdminBidChangeRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBidChangeRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBidChangeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
