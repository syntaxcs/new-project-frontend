import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemedyDialogComponent } from './remedy-dialog.component';

describe('RemedyDialogComponent', () => {
  let component: RemedyDialogComponent;
  let fixture: ComponentFixture<RemedyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemedyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemedyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
