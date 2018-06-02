import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDetailDialogComponent } from './summary-dialog-detail.component';

describe('SummaryDetailDialogComponent', () => {
  let component: SummaryDetailDialogComponent;
  let fixture: ComponentFixture<SummaryDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
