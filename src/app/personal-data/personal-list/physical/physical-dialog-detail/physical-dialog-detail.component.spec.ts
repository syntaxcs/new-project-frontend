import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalDetailDialogComponent } from './physical-dialog-detail.component';

describe('PhysicalDetailDialogComponent', () => {
  let component: PhysicalDetailDialogComponent;
  let fixture: ComponentFixture<PhysicalDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
