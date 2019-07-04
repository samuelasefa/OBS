import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnresolvedBidsComponent } from './unresolved-bids.component';

describe('UnresolvedBidsComponent', () => {
  let component: UnresolvedBidsComponent;
  let fixture: ComponentFixture<UnresolvedBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnresolvedBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnresolvedBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
