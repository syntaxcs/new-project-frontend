import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalDialogComponent } from './physical-dialog.component';

describe('PhysicalDialogComponent', () => {
  let component: PhysicalDialogComponent;
  let fixture: ComponentFixture<PhysicalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
