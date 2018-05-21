import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreaterComponent } from './treater.component';

describe('TreaterComponent', () => {
  let component: TreaterComponent;
  let fixture: ComponentFixture<TreaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
