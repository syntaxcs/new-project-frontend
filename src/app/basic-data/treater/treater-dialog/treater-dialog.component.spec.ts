import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreaterDialogComponent } from './treater-dialog.component';

describe('TreaterDialogComponent', () => {
  let component: TreaterDialogComponent;
  let fixture: ComponentFixture<TreaterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreaterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreaterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
