import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupprofileComponent } from './edit-supprofile.component';

describe('EditSupprofileComponent', () => {
  let component: EditSupprofileComponent;
  let fixture: ComponentFixture<EditSupprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSupprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSupprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
