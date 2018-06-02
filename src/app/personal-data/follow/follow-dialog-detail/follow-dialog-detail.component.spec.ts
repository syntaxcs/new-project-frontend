import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowDetailDialogComponent} from './follow-dialog-detail.component';

describe('FollowDetailDialogComponent', () => {
  let component: FollowDetailDialogComponent;
  let fixture: ComponentFixture<FollowDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
