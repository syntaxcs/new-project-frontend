import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryDialogComponent } from './summary-dialog.component';
import { PersonalDataModule } from '../../../personal-data.module';
describe('SummaryDialogComponent', () => {
  let component: SummaryDialogComponent;
  let fixture: ComponentFixture<SummaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PersonalDataModule],
      declarations: [ SummaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SummaryDialogComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(SummaryDialogComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(SummaryDialogComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
