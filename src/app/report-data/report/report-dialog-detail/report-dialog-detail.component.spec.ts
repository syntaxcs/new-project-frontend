import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailDialogComponent } from './report-dialog-detail.component';

describe('ReportDetailDialogComponent', () => {
  let component: ReportDetailDialogComponent;
  let fixture: ComponentFixture<ReportDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
