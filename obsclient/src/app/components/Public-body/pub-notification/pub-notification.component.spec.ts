import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubNotificationComponent } from './pub-notification.component';

describe('PubNotificationComponent', () => {
  let component: PubNotificationComponent;
  let fixture: ComponentFixture<PubNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
