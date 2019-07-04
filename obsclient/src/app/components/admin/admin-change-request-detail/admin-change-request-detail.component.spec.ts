import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeRequestDetailComponent } from './admin-change-request-detail.component';

describe('AdminChangeRequestDetailComponent', () => {
  let component: AdminChangeRequestDetailComponent;
  let fixture: ComponentFixture<AdminChangeRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangeRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
