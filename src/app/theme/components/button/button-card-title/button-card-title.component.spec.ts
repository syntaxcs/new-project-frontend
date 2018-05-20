import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCardTitleComponent } from './button-card-title.component';

describe('ButtonCardTitleComponent', () => {
  let component: ButtonCardTitleComponent;
  let fixture: ComponentFixture<ButtonCardTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonCardTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
