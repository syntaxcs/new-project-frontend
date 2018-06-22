import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerDialogComponent } from './officer-dialog.component';

describe('OfficerDialogComponent', () => {
  let component: OfficerDialogComponent;
  let fixture: ComponentFixture<OfficerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
