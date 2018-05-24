import { PersonalDataModule } from './personal-data.module';

describe('PersonalDataModule', () => {
  let personalDataModule: PersonalDataModule;

  beforeEach(() => {
    personalDataModule = new PersonalDataModule();
  });

  it('should create an instance', () => {
    expect(personalDataModule).toBeTruthy();
  });
});
