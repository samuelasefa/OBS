import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBidSummaryComponent } from './view-bid-summary.component';

describe('ViewBidSummaryComponent', () => {
  let component: ViewBidSummaryComponent;
  let fixture: ComponentFixture<ViewBidSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBidSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBidSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
