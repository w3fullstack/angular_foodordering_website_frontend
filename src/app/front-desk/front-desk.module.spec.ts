import { FrontDeskModule } from './front-desk.module';

describe('FrontDeskModule', () => {
  let frontDeskModule: FrontDeskModule;

  beforeEach(() => {
    frontDeskModule = new FrontDeskModule();
  });

  it('should create an instance', () => {
    expect(frontDeskModule).toBeTruthy();
  });
});
