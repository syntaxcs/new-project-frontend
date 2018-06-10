import { ReportDataModule } from './report-data.module';

describe('ReportDataModule', () => {
  let reportDataModule: ReportDataModule;

  beforeEach(() => {
    reportDataModule = new ReportDataModule();
  });

  it('should create an instance', () => {
    expect(reportDataModule).toBeTruthy();
  });
});
