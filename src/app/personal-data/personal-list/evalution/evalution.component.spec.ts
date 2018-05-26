import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EvalutionComponent } from './evalution.component';

describe('EvalutionComponent', () => {
  let component: EvalutionComponent;
  let fixture: ComponentFixture<EvalutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
