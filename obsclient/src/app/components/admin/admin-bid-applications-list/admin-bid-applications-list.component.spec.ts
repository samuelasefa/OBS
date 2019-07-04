import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBidApplicationsListComponent } from './admin-bid-applications-list.component';

describe('AdminBidApplicationsListComponent', () => {
  let component: AdminBidApplicationsListComponent;
  let fixture: ComponentFixture<AdminBidApplicationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBidApplicationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBidApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
