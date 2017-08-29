import { DefenderClientPage } from './app.po';

describe('defender-client App', () => {
  let page: DefenderClientPage;

  beforeEach(() => {
    page = new DefenderClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
