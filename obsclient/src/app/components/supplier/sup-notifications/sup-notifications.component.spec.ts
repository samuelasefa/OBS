import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupNotificationsComponent } from './sup-notifications.component';

describe('SupNotificationsComponent', () => {
  let component: SupNotificationsComponent;
  let fixture: ComponentFixture<SupNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
