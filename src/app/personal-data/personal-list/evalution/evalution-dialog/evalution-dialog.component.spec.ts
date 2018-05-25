import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalutionDialogComponent } from './evalution-dialog.component';

describe('EvalutionDialogComponent', () => {
  let component: EvalutionDialogComponent;
  let fixture: ComponentFixture<EvalutionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalutionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
